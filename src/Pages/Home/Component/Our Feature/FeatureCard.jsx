 

 

const FeatureCard = ({icon,title,discription}) => {
    return (
        <div className="card bg-base-100 shadow-xl h-[300px]">
        <figure className="px-10 pt-10 text-6xl text-[#5bbb7b]">
     {icon}
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{title}</h2>
    <p className="">{discription}</p>
    <div className="card-actions">
       
    </div>
  </div>
</div>
    );
};

export default FeatureCard;