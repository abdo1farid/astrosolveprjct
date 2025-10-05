import { useDrop } from 'react-dnd';

const DropZone = ({ title, onDrop, image, zone }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'planet',
        drop: (item) => {
            console.log('Dropping item:', item, 'in zone:', zone);
            onDrop(item, zone);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`w-40 h-40 flex items-center justify-center rounded-full shadow-lg relative ${isOver ? 'opacity-75' : ''}`}
        >
            <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover rounded-full opacity-50"
            />
            <h2 className="text-xl font-bold text-white z-10">{title}</h2>
        </div>
    );
};

export default DropZone;