import JSEncrypt  from 'jsencrypt'

const pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDNnNzjdTU0L7xrNPK/PfkNZu6rheIuy2wy4mWjSQjpN7jDtON621wWiOJgJuYK/XwV9g2tyJSinQYHoyruulsBVLtxTI4s84WfzpmrS8uoqu22cAjETBSwEe+HKyLUzrWfdzQduwFDSVNto/lRDsNXNS9g/PAs7qYx5rMFyusvuQIDAQAB
-----END PUBLIC KEY-----`

const encryptStr = new JSEncrypt()
encryptStr.setPublicKey(pubKey)

export const getRsa = (str) => {
  return encryptStr.encrypt(str.toString())
}
