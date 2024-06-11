import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../../Component/SectionTitle";
import useAdmin from "../../../../Hooks/useAdmin";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";

const ClientHome = () => {
  const [isAdmin] = useAdmin();
  const axiosSecure = useAxiosSecure();
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["submission"],
    queryFn: async () => {
      const res = await axiosSecure.get("/submission");
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
  return (
    <div>
      <SectionTitle
        subHeading={"Client Home"}
        heading={"Activity"}
      ></SectionTitle>
      <div className="p-4">
        <div className="text-xl font-semibold grid md:grid-cols-3 grid-cols-1">
          <h2>Available coin:{isAdmin?.coins}</h2>
          <h2>Panding :{pending?.length}</h2>
          <h2>Total Pay:{isAdmin?.total_pay}</h2>
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
      </div>
    </div>
  );
};

export default ClientHome;
