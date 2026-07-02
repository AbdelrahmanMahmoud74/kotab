import { useState } from "react";
import "./App.css";

function App() {
  const [seat, setSeat] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    if (!seat) {
      alert("من فضلك أدخل رقم الجلوس");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/vv.json");
      const students = await response.json();

      const result = students.find(
        (item) => String(item["م"]) === String(seat)
      );

      if (result) {
        setStudent(result);
      } else {
        setStudent({
          message: "لم يتم العثور على الطالب"
        });
      }
    } catch (error) {
      console.log(error);
      alert("حدث خطأ أثناء تحميل البيانات");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <div className="card">

        <img src="f.jpeg" className="logo" alt="Logo" />

        <h1 className="mainTitle">
          <span>دار مؤسسة الصحفي</span>
          <br /><br />
          <span>للقرآن الكريم</span>
        </h1>

        <h2>نتيجة آخر العام الدراسي 2026</h2>
<br /><br />
        <div className="searchBox">

          <input
            type="number"
            placeholder="أدخل رقم الجلوس"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
          />

          <button onClick={getResult}>
            {loading ? "جاري البحث..." : "عرض النتيجة"}
          </button>

        </div>

      </div>

      {student && !student.message && (

        <div className="resultCard">
          <br />

          <h2 className="title">
            بيانات الطالب
          </h2>

          <table>

            <tbody>

              <tr>
                <th>رقم الجلوس</th>
                <td>{student["م"]}</td>
              </tr>

              <tr>
                <th>الاسم</th>
                <td>{student["الاسم"]}</td>
              </tr>

              <tr>
                <th>السن</th>
                <td>{student["السن"]}</td>
              </tr>

              <tr>
                <th>النوع</th>
                <td>{student["النوع"]}</td>
              </tr>

              <tr>
                <th>الكمية</th>
                <td>{student["الكمية"]}</td>
              </tr>

              <tr>
                <th>اسم الشيخ</th>
                <td>{student["اسم الشيخ"]}</td>
              </tr>

              <tr>
                <th>اسم الفريق</th>
                <td>{student["اسم الفريق"]}</td>
              </tr>

              <tr className="degree">
                <th>الدرجة</th>
                <td>{student["الدرجة"]}</td>
              </tr>

            </tbody>

          </table>

          <div className="success">
            🎉 بارك الله فيكم ونسأل الله لكم دوام التوفيق
          </div>

        </div>

      )}

      {student?.message && (

        <div className="notFound">

          {student.message}

        </div>

      )}

    </div>
  );
}

export default App;