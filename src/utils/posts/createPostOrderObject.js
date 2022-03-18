export default function createPostOrderObject(data, startIndex, endIndex) {
    const postIndexes = [];
    for(let i = startIndex; i <= endIndex; i++){
        const postIndex = {id: data[i].id, index:i};
        postIndexes.push(postIndex);
        console.log(data[i].id);
    }

    return postIndexes;
}
