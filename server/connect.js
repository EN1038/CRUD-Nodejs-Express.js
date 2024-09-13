const submitData = async () => {
  // ดึงข้อมูลจาก DOM
  const firstNameDOM = document.querySelector('input[name="firstName"]');
  const lastNameDOM = document.querySelector('input[name="lastName"]');
  const ageDOM = document.querySelector('input[name="age"]');
  const genderDOM = document.querySelector('input[name="gender"]:checked');
  const checkedElements = document.querySelectorAll(
    'input[name="preferences"]:checked'
  );
  const descriptionDOM = Array.from(checkedElements).map(
    (checkbox) => checkbox.value
  );
  const descriptionString = descriptionDOM.join(", ");
  const interest = document.querySelector("#comments");
  const age = ageDOM ? parseInt(ageDOM.value.trim(), 10) : null

  // ตรวจสอบค่าที่ดึงมา
  if (!firstNameDOM || !lastNameDOM || !ageDOM || !genderDOM || !interest) {
    console.error("Some elements are missing.");
    return;
  }

  // สร้างข้อมูลผู้ใช้
  let userData = {
    fisrt_name: firstNameDOM.value.trim(),
    last_name: lastNameDOM.value.trim(),
    age: age,
    gender: genderDOM.value,
    description: interest.value.trim(),
    interests: descriptionString,
  };

  console.log("User Data:", userData);

  // ส่งข้อมูลไปยังเซิร์ฟเวอร์
  try {
    if (mode == 'EDIT') {
      // นำ selectedId เอาไว้
      response = await axios.put(
        "http://localhost:8000/users/"+selectedId,
        userData
      )
      getData()
    } else {
      response = await axios.post(
        "http://localhost:8000/users", userData,
        userData
      )
      getData()
    }
    console.log("Response Data:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};


let getData = async () =>{
  try{
    const tableBody = document.getElementById('userTable');
    tableBody.innerHTML = ''
    const response = await axios.get("http://localhost:8000/users");
    response.data.forEach(element => {
      const row = document.createElement('tr');
      row.classList.add('border-b', 'border-gray-300', 'text-gray-900','hover:bg-gray-100');
      row.innerHTML =  `
        <td class="py-3 px-6 text-left">${element.fisrt_name}</td>
        <td class="py-3 px-6 text-left">${element.last_name}</td>
        <td class="py-3 px-6 text-left">${element.age}</td>
        <td class="py-3 px-6 text-left">${element.gender}</td>
        <td class="py-3 px-6 text-left">${element.interests}</td>
        <td class="py-3 px-6 text-left">${element.description}</td>
        <a href='connect.html?id=${element.id}'><button class="bg-blue-500 text-white px-3 py-1 rounded">Edit</button></a>
        <button class="bg-red-500 text-white px-3 py-1 rounded ml-2" onclick="DeleteData(this)" data-set="${element.id}">Delete</button>
    `;
    tableBody.appendChild(row);
    });
  }catch(error){
    console.error("Error:", error);
  }
}

let DeleteData = async (button) =>{
  try{
   let id = button.dataset.set
   const response = await axios.delete("http://localhost:8000/users/"+id)
   if(response){
    console.log('success')
    getData()
   }

  }catch(error){
    console.error("Error:", error)
  }
}

// default mode ของหน้านี้คือ mode สร้าง
let mode = 'CREATE'
let selectedId = -1

window.onload = async () => {
  // นำ parameter ทั้งหมดมาใส่ตัวแปร urlParams
  const urlParams = new URLSearchParams(window.location.search)
  // ดึง id ออกมาจาก parameter
  const id = urlParams.get('id')
  if (id) {
    // ถ้ามี id = เปลี่ยน mode และเก็บตัวแปร id เอาไว้
    mode = 'EDIT'
    selectedId = id

  }
}

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const id = urlParams.get('id')
  const title = document.getElementById('title')
  if (id) { 
    mode = 'EDIT'
    selectedId = id

    title.textContent = 'EditForm'

    // select ทุก dom ออกมา 
    let firstNameDOM = document.querySelector('input[name=firstName]')
    let lastNameDOM = document.querySelector('input[name=lastName]')
    let ageDOM = document.querySelector('input[name=age]')
    let genderDOMs = document.querySelectorAll('input[name=gender]')
    let interestDOMs = document.querySelectorAll('input[name=preferences]')
    let descriptionDOM = document.querySelector('textarea[name=comments]')

    try {
      const response = await axios.get("http://localhost:8000/users/"+id)
      const user = response.data

      // เริ่มทำการใส่ข้อมูล
      firstNameDOM.value = user.fisrt_name
      lastNameDOM.value = user.last_name
      ageDOM.value = user.age
      descriptionDOM.value = user.description

      for (let i = 0; i < genderDOMs.length; i++) {
        if (genderDOMs[i].value == user.gender) {
          genderDOMs[i].checked = true
        }
      }

      const interests = user.interests.split(',').map(interest => interest.trim())
      for (let i = 0; i < interestDOMs.length; i++) {
        if (interests.includes(interestDOMs[i].value)) {
          interestDOMs[i].checked = true
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }
}