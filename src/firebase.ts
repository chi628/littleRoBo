// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, get, child } from 'firebase/database'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
}

export async function readData() {
  const db = getDatabase()
  const _ref = ref(db)

  const res: { [key: string]: { gender: string; username: string } } = await new Promise((resolve, reject) => {
    get(child(_ref, 'users'))
      .then(snapshot => {
        if (snapshot.exists()) {
          resolve(snapshot.val())
        }
      })
      .catch(e => {
        reject(e)
      })
  })

  return res
}

export function writeUserData(userId: string, name: string, ans: string) {
  const db = getDatabase()
  set(ref(db, 'users/' + userId), {
    username: name,
    gender: ans,
  })
}

export function generateUserId(userName: string) {
  // 將用戶輸入的名字轉換為小寫，並移除不允許的字符
  const sanitizedUserName = userName.toLowerCase().replace(/[\.\$\#\[\]\/\x00-\x1F\x7F]/g, '')

  // 確保userId不超過最大長度
  const maxLength = 768
  const truncatedUserName = sanitizedUserName.substring(0, maxLength)

  // 返回符合規範的userId
  return truncatedUserName
}

initializeApp(firebaseConfig)
