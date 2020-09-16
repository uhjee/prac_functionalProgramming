// 2-1. _filter
function _filter(list, predi) {
    let new_list = [];

    _each(list, function (value) {
        if (predi(value)) {
            new_list.push(value);
        }
    })
    return new_list;
}

// 2-2. _map
function _map(list, mapper) {
    let new_list = [];

    // cllaback는 _each 함수 내부의 iter로 받는다
    _each(list, function (value) {
        new_list.push(mapper(value));
    });

    return new_list;
}

// 2-3. _each 
function _each(list, iter) {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}