const URL = "https://dr-python-mvm9.onrender.com/student/logout/";
const USER_TOKEN = localStorage.getItem("USER_TOKEN")
const LogOutStudentAPI = async (setError, setLoading, setAllStudents, studentId, currentPage) => {
    setLoading(true)
    try {
        const response = await fetch(`${URL}${studentId}/${currentPage}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `drpz0${USER_TOKEN}`
            },
        });

        const result = await response.json();

        if (response.ok) {
            setAllStudents(result.students)
            setLoading(false)
            document.querySelector(".logoutStudent").style.display = "none";
        } else {
            if (response.status == 500) {
                setError(result.message);
                setLoading(false)
            } else {
                setError(response.message);
                setLoading(false)
            }
        }
    } catch (error) {
        setError('An error occurred');
        setLoading(false)

    }
}
export default LogOutStudentAPI;