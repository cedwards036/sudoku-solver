export default function Column({index, left = null, right = null, up = null, down = null}) {
    const column = Object.create(Column.prototype);
    column.index = index;
    column.left = left;
    column.right = right;
    column.up = up;
    column.down = down;
    return column;
}

Column.prototype = {

}