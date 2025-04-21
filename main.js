let groupID = null;

// Tạo nhóm mới
function createGroup() {
  const groupName = document.getElementById('group-name').value.trim();
  if (groupName) {
    // Thêm nhóm mới vào Firestore
    const groupRef = db.collection('groups').add({
      name: groupName,
      careers: {}, // Mảng nghề nghiệp ban đầu rỗng
    }).then(docRef => {
      groupID = docRef.id;
      // Hiển thị liên kết nhóm
      const groupLink = `${window.location.href}?groupID=${groupID}`;
      document.getElementById('group-link-input').value = groupLink;
      document.getElementById('group-link').style.display = 'block';  // Hiển thị liên kết nhóm
      alert("Nhóm đã được tạo! Chia sẻ liên kết nhóm cho các thành viên khác.");
    }).catch(error => {
      alert("Đã xảy ra lỗi khi tạo nhóm: " + error.message);
    });
  } else {
    alert("Vui lòng nhập tên nhóm!");
  }
}
