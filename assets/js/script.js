const form = document.getElementById("form-survey");
const result = document.getElementById("response");
const endPoint = "https://st2lww-8888.csb.app/ashari/data";

async function restApi() {
  const getData = await fetch(endPoint);
  const data = await getData.json();
  result.innerHTML = "";
  data.results.forEach((e) => {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdAge = document.createElement("td");
    const tdGender = document.createElement("td");
    const tdIsSmoke = document.createElement("td");
    const tdCigarVariant = document.createElement("td");
    tdName.innerText = e.name;
    tdAge.innerText = e.age;
    tdGender.innerText = e.gender;
    tdCigarVariant.innerText = e.cigarVariant.join("; ");

    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdGender);
    if (e.isSmoker) {
      tdIsSmoke.innerText = "Ya";
      tr.appendChild(tdIsSmoke);
    } else {
      tdIsSmoke.innerText = "Tidak";
      tr.appendChild(tdIsSmoke);
    }
    tr.appendChild(tdCigarVariant);
    result.appendChild(tr);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const age = e.target.age.value;
  const gender = e.target.gender.value;
  const isSmoker = e.target.smoker.value;
  const cigar = document.getElementsByName("cigar");
  let cigarVarianArr = [];
  for (let i = 0; i < cigar.length; i++) {
    if (cigar[i].checked) {
      cigarVarianArr.push(cigar[i].value);
    }
  }
  const cigarVariant = cigarVarianArr.join("; ");

  const dataForm = new URLSearchParams();
  if (name !== "") {
    dataForm.append("name", name);
  } else {
    window.alert("Data tidak boleh kosong");
    return;
  }
  if (age !== "" && parseInt(age) > 0) {
    dataForm.append("age", age);
  } else {
    window.alert("Data tidak boleh kosong");
    return;
  }
  if (gender !== "") {
    dataForm.append("gender", gender);
  } else {
    window.alert("Data tidak boleh kosong");
    return;
  }
  if (isSmoker !== "") {
    dataForm.append("isSmoker", isSmoker);
  } else {
    window.alert("Data tidak boleh kosong");
    return;
  }
  dataForm.append("cigarVariant", cigarVariant);

  const pushData = await fetch(endPoint, {
    method: "POST",
    body: dataForm,
  });
  const data = await pushData.json();
  if (data.success) {
    alert("data berhasil disimpan");
  } else alert("data gagal");
  form.reset();
  restApi();
});

restApi();
