 

const SectionTitle = ({subHeading,heading}) => {
    return (
        <div className="text-center  mx-auto mb-10">
            <p className="text-yellow-600 mb-2 ">---{subHeading}---</p>
            <h3 className="text-4xl uppercase  py-2">{heading}</h3>
        </div>
    );
};

export default SectionTitle;