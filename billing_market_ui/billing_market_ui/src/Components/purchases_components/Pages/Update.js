import React from 'react'

function Update() {

    const {userId} = useParams();

    const {register, handleSubmit, setValue} = useForm();
    const navigate = useNavigate()

    async function fetchUser(){
        const result = await axios.get(`http://localhost:5000/users/${userId}`);
        setValue("roll", result.data.roll);
        setValue("fname",result.data.fname);
        setValue("lname",result.data.lname);
        setValue("marks",result.data.marks);
    }

    const saveData= data=>{
        axios.put(`http://localhost:5000/users/${userId}`, data);
        navigate('/user/show')
    }

    useEffect(()=>{
        fetchUser()
    }, [])
  return (
    <>
       <div>
        <center><h1><u>UPDATE FORM</u></h1></center>
        <form onSubmit={handleSubmit(saveData)}>
            <label htmlFor='rn'><b>ENTER ROLL NO</b></label>
            <input type='number' id='rn' className='form-control' {...register("roll")}/>
            <br/>
            <br/>
            <label htmlFor='fn'><b>ENTER FIRST NAME</b></label>
            <input type='text' id='fn' className='form-control' {...register("fname")}/>
            <br/>
            <br/>
            <label htmlFor='ln'><b>ENTER LAST NAME</b></label>
            <input type='text' id='ln' className='form-control' {...register("lname")}/>
            <br/>
            <br/>
            <label htmlFor='mr'><b>ENTER MARKS</b></label>
            <input type='number' id='mr' className='form-control' {...register("marks")}/>
            <br/>
            <br/>
            <input type='submit' value='UPDATE FORM' className='btn btn-outline-success col-6'/>
            <input type='reset' value='RESET' className='btn btn-outline-warning col-6 float-right'/>
        </form>
      </div>
    </>
  )
}

export default Update