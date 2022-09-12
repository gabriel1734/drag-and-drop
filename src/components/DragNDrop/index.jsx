import { useRef, useState } from "react";

export const DragNDrop = ( {data = ''} ) => {
    const [list, setList] = useState(data);
    const dragItem = useRef();
    const dragNode = useRef();
    const [dragging, setDragging] = useState(false);

    const HandleDragStart = (e, params) => {
        console.log('start drag', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', HandleDragEnd);
        setDragging(true);
        
    }

    const HandleDragEnter = (e, params) => {
        console.log('Entering drag', params);
        const currentItem = dragItem.current;
        if (e.target !== dragNode.current) {
            console.log('target is not the same');
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList));
                console.log('newList: ', newList);
                newList[params.grpI].items.splice(params.itemI, 0, newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]);
                dragItem.current = params;
                return newList;
            })
        } 
    }
    const HandleDragEnd = () => {
        console.log('drag end');
        dragNode.current.removeEventListener('dragend', HandleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
        setDragging(false);
    }

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (currentItem.grpI === params.grpI && currentItem.itemI === params.itemI) {
            return "dnd-item current"
        }
        return 'dnd-item';
    }

    return (
        <>
            {list.map((group, GroupI) => (
                <div
                    className="dnd-group"
                    key={GroupI}
                    onDragEnter={dragging && !group.items.length ? (e) => HandleDragEnter(e, {grpI: GroupI, itemI: 0}) : null}
                >
                <div className="group-title">{group.title}</div>
                {group.items.map((item, itemID) => (
                    <div
                        draggable
                        onDragStart={(e) => { HandleDragStart(e, { grpI: GroupI, itemI: itemID }) }}
                        onDragEnter={dragging ? (e) => { HandleDragEnter(e, {grpI: GroupI, itemI: itemID}) } : null}
                        className={dragging ? getStyles({ grpI: GroupI, itemI: itemID }) : 'dnd-item'}
                        key={itemID}
                    >
                    {item}
                    </div>
                ))}
                </div>
            ))}
        </>
    );
};

