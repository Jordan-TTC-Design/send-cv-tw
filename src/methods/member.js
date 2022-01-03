// const Member = function (data) {
//   this.version = 'v1.0'; // this 宣告的變數或物件會曝露出去
//   const new_data = data; // 接收傳進來的參數

//   this.add = async (add_data) => {
//     const data = new_data || add_data;
//     let uid = '';
//     // 新增用戶 https://firebase.google.com/docs/auth/admin/manage-users#create_a_user
//     try {
//       const userRecord = await admin.auth().createUser({
//         email: data.email,
//         phoneNumber: data.phoneNumber,
//         password: data.password,
//         displayName: data.displayName,
//         photoURL: data.photoURL,
//       });
//       uid = userRecord.uid; // 回傳 uid
//     } catch (err) {
//       return { err: err.errorInfo.code }; // 回傳 code (https://firebase.google.com/docs/auth/admin/errors)
//     }
//     if (!uid) return { err: '新增失敗' };

//     // delete data.password; //密碼刪掉，因為後面是要存到firestore的資料，所以先把密碼刪除
//     // 要把 data.password 改成 null 避免直接刪掉，因為之後信箱驗證動作還是需要 password 欄位
//     return db
//       .collection('MEMBER')
//       .doc(uid)
//       .set({
//         ...Member.prototype.member,
//         ...data,
//         createdAt: admin.firestore.FieldValue.serverTimestamp(),
//         uid,
//         password: null,
//       });
//   };
// };

// // prototype 是物件導向專屬
// Member.prototype = {
//   // 使用原型屬性
//   member: {
//     // 會員資料表結構
//     uid: '', // 會員 uid
//     email: '', // 會員 email
//     displayName: '', // 會員姓名
//     photoURL: '', // 會員照片
//     emailNotification: false, // email 是否驗證
//     updateAt: '', // 更新時間
//     createdAt: '', // 建立時間
//   },
// };

// module.exports = Member;
