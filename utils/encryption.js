const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

class DataEncryption {
  constructor() {
    this.algorithm = "aes-256-gcm";
    this.keyLength = 32;
    this.ivLength = 16;
    this.tagLength = 16;
    this.saltLength = 64;
    this.iterations = 100000;

    // Get or create encryption key
    this.encryptionKey = this.getOrCreateEncryptionKey();
  }

  // Get or create a persistent encryption key based on machine ID
  getOrCreateEncryptionKey() {
    const keyPath = path.join(__dirname, "..", "data", ".encryption_key");
    const machineId = this.getMachineId();

    try {
      if (fs.existsSync(keyPath)) {
        const keyData = JSON.parse(fs.readFileSync(keyPath, "utf8"));
        if (keyData.machineId === machineId) {
          return Buffer.from(keyData.key, "hex");
        }
      }
    } catch (error) {
      console.log("Creating new encryption key...");
    }

    // Generate new key
    const newKey = crypto.randomBytes(this.keyLength);
    const keyData = {
      machineId: machineId,
      key: newKey.toString("hex"),
      createdAt: new Date().toISOString(),
    };

    // Ensure data directory exists
    const dataDir = path.join(__dirname, "..", "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save key (this file should also be in .gitignore)
    fs.writeFileSync(keyPath, JSON.stringify(keyData, null, 2));

    return newKey;
  }

  // Generate a unique machine ID based on system information
  getMachineId() {
    const os = require("os");
    const platform = os.platform();
    const arch = os.arch();
    const hostname = os.hostname();
    const networkInterfaces = os.networkInterfaces();

    // Get first non-internal network interface MAC address
    let macAddress = "";
    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      for (let i = 0; i < interfaces.length; i++) {
        const iface = interfaces[i];
        if (!iface.internal && iface.mac !== "00:00:00:00:00:00") {
          macAddress = iface.mac;
          break;
        }
      }
      if (macAddress) break;
    }

    const machineString = `${platform}-${arch}-${hostname}-${macAddress}`;
    return crypto.createHash("sha256").update(machineString).digest("hex");
  }

  // Encrypt data
  encrypt(data) {
    try {
      const iv = crypto.randomBytes(this.ivLength);
      const salt = crypto.randomBytes(this.saltLength);

      // Derive key from salt
      const key = crypto.pbkdf2Sync(
        this.encryptionKey,
        salt,
        this.iterations,
        this.keyLength,
        "sha512"
      );

      // Create cipher
      const cipher = crypto.createCipheriv(this.algorithm, key, iv);

      // Encrypt data
      let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
      encrypted += cipher.final("hex");

      // Get authentication tag
      const tag = cipher.getAuthTag();

      // Return encrypted data with metadata
      return {
        encrypted: encrypted,
        iv: iv.toString("hex"),
        salt: salt.toString("hex"),
        tag: tag.toString("hex"),
        algorithm: this.algorithm,
        version: "1.0",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Encryption error:", error);
      throw new Error("Failed to encrypt data");
    }
  }

  // Decrypt data
  decrypt(encryptedData) {
    try {
      const { encrypted, iv, salt, tag, algorithm, version } = encryptedData;

      if (algorithm !== this.algorithm) {
        throw new Error("Unsupported encryption algorithm");
      }

      // Derive key from salt
      const key = crypto.pbkdf2Sync(
        this.encryptionKey,
        Buffer.from(salt, "hex"),
        this.iterations,
        this.keyLength,
        "sha512"
      );

      // Create decipher
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        key,
        Buffer.from(iv, "hex")
      );
      decipher.setAuthTag(Buffer.from(tag, "hex"));

      // Decrypt data
      let decrypted = decipher.update(encrypted, "hex", "utf8");
      decrypted += decipher.final("utf8");

      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Decryption error:", error);
      throw new Error(
        "Failed to decrypt data - data may be corrupted or key mismatch"
      );
    }
  }

  // Save encrypted data to file
  saveEncryptedData(filename, data) {
    const encrypted = this.encrypt(data);
    const filePath = path.join(__dirname, "..", "data", `${filename}.enc`);

    // Ensure data directory exists
    const dataDir = path.dirname(filePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2));
    return filePath;
  }

  // Load and decrypt data from file
  loadEncryptedData(filename) {
    const filePath = path.join(__dirname, "..", "data", `${filename}.enc`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    try {
      const encryptedData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      return this.decrypt(encryptedData);
    } catch (error) {
      console.error(`Error loading encrypted data from ${filename}:`, error);
      return null;
    }
  }

  // Check if encrypted file exists
  encryptedFileExists(filename) {
    const filePath = path.join(__dirname, "..", "data", `${filename}.enc`);
    return fs.existsSync(filePath);
  }

  // Backup encrypted data
  backupEncryptedData(filename) {
    const sourcePath = path.join(__dirname, "..", "data", `${filename}.enc`);
    const backupDir = path.join(__dirname, "..", "data", "backups");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = path.join(backupDir, `${filename}_${timestamp}.enc`);

    if (!fs.existsSync(sourcePath)) {
      return false;
    }

    // Ensure backup directory exists
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    fs.copyFileSync(sourcePath, backupPath);
    return backupPath;
  }

  // Wipe encrypted data (for privacy)
  wipeEncryptedData(filename) {
    const filePath = path.join(__dirname, "..", "data", `${filename}.enc`);

    if (fs.existsSync(filePath)) {
      // Overwrite with random data before deletion
      const fileSize = fs.statSync(filePath).size;
      const randomData = crypto.randomBytes(fileSize);
      fs.writeFileSync(filePath, randomData);

      // Delete file
      fs.unlinkSync(filePath);
      return true;
    }

    return false;
  }
}

module.exports = DataEncryption;
