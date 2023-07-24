
const GalleryCard = ({college}) => {
    const {groupImg} = college;

    return (
        <div className="carousel-item h-full border-2 border-red-500 rounded-xl">
            <img className="rounded-xl" src={groupImg} />
        </div>
    );
};

export default GalleryCard;