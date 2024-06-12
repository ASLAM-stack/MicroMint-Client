import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Component/SectionTitle";
import useAdmin from "../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import { FaCoins } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ClientHome = () => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
   
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const res = await axiosSecure.get("/submission");
      return res.data;
    },
  });
  const { data: coins = [] } = useQuery({
    queryKey: ["coins"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coin");
      return res.data;
    },
  });
   

  const pending = tasks.filter((item) => item.status === "pending");

  const handelUpdate = async (id, email, payable_amount) => {
    console.log(id, email, payable_amount);
    const status = {
      status: "approve",
    };
    const res = await axiosSecure.patch(`/submission/${id}`, status);
    console.log(res);
    if (res.data.modifiedCount > 0) {
      const res = await axiosSecure.get(`/user/${email}`);
      console.log(res);
      const worker = res.data;
      console.log(worker);
      const currentCoin = parseInt(payable_amount) + worker?.coins;
      console.log(worker.coins);
      const update = {
        currentCoin: currentCoin,
      };
      console.log(update);
      const addres = await axiosSecure.patch(`/user/${worker.email}`, update);
      if (addres.data.modifiedCount > 0) {
        const pay = isAdmin?.total_pay + parseInt(payable_amount);
        const update_pay = {
          total_pay: pay,
        };
        const totalres = await axiosSecure.patch(
          `/update/total/${isAdmin?.email}`,
          update_pay
        );
        if (totalres.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully approve",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  const handleReject = async (id) => {
    const status = {
      status: "reject",
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to reject this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`/submission/${id}`, status);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Rejected!",
            text: "The Submission has been rejected",
            icon: "success",
          });
        }
        refetch();
      }
    });
  };
  const handleBuy =async (coin) =>{
    const email= isAdmin?.email;
    const {coins,price,heading} =coin;
    const order = {
      heading,
      email,
      coins,
      price
    }
     const res = await axiosSecure.post('/cart',order)
     if(res.data.insertedId){
      navigate('/dashboard/buyCoin')
     }
  }
  return (
    <div>
      <SectionTitle
        subHeading={"Client Home"}
        heading={"Activity"}
      ></SectionTitle>
      <div className="p-4">
      <div className="stats shadow  stats-vertical lg:stats-horizontal">
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div className="stat-title">Available coin</div>
    <div className="stat-value">{isAdmin?.coins}</div>
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
    </div>
    <div className="stat-title">Panding :</div>
    <div className="stat-value">{pending?.length}</div>
     
  </div>
  
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    </div>
    <div className="stat-title">Total Pay:</div>
    <div className="stat-value">{isAdmin?.total_pay}</div>
    
     
  </div>
  
</div>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>S.N</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Pay Amount</th>
                  <th>Status</th>
                  <th>Accept</th>
                  <th>Reject</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {tasks?.map((task, index) => {
                  return (
                    <tr key={task._id}>
                      <th>{index + 1}</th>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={task?.tasktask_image_url}
                                alt={task.task_title}
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{task.task_title}</td>

                      <td>{task.payable_amount}</td>
                      <td>{task.status}</td>
                      <td
                        onClick={() =>
                          handelUpdate(
                            task._id,
                            task.worker_email,
                            task.payable_amount
                          )
                        }
                        className={`cursor-pointer ${
                          task.status === "approve" || task.status === "reject"
                            ? "btn-disabled"
                            : ""
                        }`}
                      >
                        <IoCheckmarkCircleSharp className="text-3xl text-green-500" />
                      </td>
                      <td
                        className={`cursor-pointer ${
                          task.status === "approve" || task.status === "reject"
                            ? "btn-disabled"
                            : ""
                        }`}
                        onClick={() => handleReject(task._id)}
                      >
                        <TiDelete className="text-4xl text-red-500" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/*  */}
        <div className=" mt-10">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-center">Our Packages</h1>
          </div>
          <div className="mt-10 grid md:grid-cols-3 grid-cols-1 gap-5">

          {
            coins?.map(coin => <div key={coin._id} className="card card-compact  bg-base-100 shadow">
              <figure className="m-4"> 
              <FaCoins className="text-6xl text-orange-500" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{coin.heading}</h2>
                <p>Purchase digital coins effortlessly for seamless transactions and investment opportunities.</p>
                <div  className="card-actions">
                  <button onClick={() =>handleBuy(coin)} className="btn btn-primary w-full">Buy Now</button>
                </div>
              </div>
            </div>)
          }
       
         
 
       
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default ClientHome;
