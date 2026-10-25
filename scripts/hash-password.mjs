// Tạo mã băm mật khẩu quản trị cho biến ADMIN_PASSWORD_HASH (scrypt, có sẵn trong Node, không cần thư viện).
// Dùng: npm run hash-password   (nhập mật khẩu khi được hỏi, không hiện trên màn hình và không lưu vào lịch sử lệnh)
import { randomBytes, scryptSync } from "node:crypto";
import { createInterface } from "node:readline";

const N = 16384, r = 8, p = 1, KEYLEN = 64;

function ask(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    rl._writeToOutput = (s) => { if (s.includes(question)) rl.output.write(s); };
    rl.question(question, (answer) => { rl.close(); process.stdout.write("\n"); resolve(answer); });
  });
}

const password = process.argv[2] ?? (await ask("Mật khẩu mới: "));
if (password.length < 12 && process.env.ALLOW_WEAK !== "1") {
  console.error("Mật khẩu cần ít nhất 12 ký tự (máy dev có thể đặt ALLOW_WEAK=1).");
  process.exit(1);
}
const salt = randomBytes(16);
const hash = scryptSync(password, salt, KEYLEN, { N, r, p });
// Dùng dấu ":" (không dùng "$" vì Next.js hiểu "$" trong file .env là biến)
console.log(`ADMIN_PASSWORD_HASH=scrypt:${N}:${r}:${p}:${salt.toString("base64url")}:${hash.toString("base64url")}`);
