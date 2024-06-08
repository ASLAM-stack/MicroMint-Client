 

 

const TopEarnCard = ({item}) => {
    const {name,skills,earnings,projects_completed,rating,image} = item;
    console.log(name,skills,earnings,projects_completed,rating,image);
    return (
        <div className="mb-4">
            <div className="card bg-base-100   shadow-xl">
  <figure className="px-10 pt-10 h-[200px]">
  <div className="avatar">
  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
    <img src={image} />
  </div>
</div>
  </figure>
  <div className="card-body ">
    <h2 className="text-2xl font-semibold text-center">{name}</h2>
    <div className="flex gap-3 flex-wrap">
    {
        skills.map((skill,index) => <span key={index} className="p-2 bg-red-200 text-black font-medium rounded-lg">{skill}</span>)
     }
    </div>
    <div className="card-actions flex">
       <div className=" flex gap-5 justify-between">
        <p className="text-lg font- meduim">Earnigs: ${earnings} </p>
        <p className="text-lg font- meduim">Completed Project:{projects_completed} </p>
         
       </div>
       <div className="flex-1">
        <p>Rataing:{rating}</p>
       </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default TopEarnCard;