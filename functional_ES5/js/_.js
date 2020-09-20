// 2-4. _curry
function _curry(fn) {
    return function (a, b) {
        // 위의 2. if문을 삼항연산자로 처리
        return arguments.length === 2 ?
            fn(a, b) : function (b) {
                return fn(a, b);
            }
    }
}

// 2-4. _curryr
function _curryr(fn) {
    return function (a, b) {
        return arguments.length === 2 ?
            fn(a, b) : function (b) {
                // 들어온 인자를 거꾸로 적용
                return fn(b, a);
            }
    }
}

// 2-5. _get
let _get = _curryr(function (obj, key) {
    return obj == null ? undefined : obj[key];
});

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
_filter = _curryr(_filter);

// 2-2. _map
function _map(list, mapper) {
    let new_list = [];

    // cllaback는 _each 함수 내부의 iter로 받는다
    _each(list, function (value) {
        new_list.push(mapper(value));
    });

    return new_list;
}
_map = _curryr(_map);

// 2-3. _each 
function _each(list, iter) {
    for (let i = 0; i < list.length; i++) {
        iter(list[i]);
    }
    return list;
}

// 2-6. _rest
// 유사배열을 첫 번째 인수만 잘라서 버리고 배열로 반환
let slice = Array.prototype.slice;

function _rest(arrayLike, num) {
    // num이 있다면 num, 없다면 1이 default;
    return slice.call(arrayLike, num || 1);
}

// 2-7. _reduece
function _reduce(list, iter, memo) {
    // memo를 받지 않았을 때도 작동하게끔. 인자가 앞의 2개 일 때
    if (arguments.length == 2) {
        // 첫 번째 인자를 memo default로 삼고
        memo = list[0];
        // _rest에서 첫 번째 인자 잘라버리기 ... 그래야 첫번째 인자 중복 x
        list = _rest(list);
    }
    _each(list, function (val) {
        memo = iter(memo, val);
    })
    return memo;
}

// 2-8. _pipe
function _pipe() {
    // 인자로 받는 함수들 변수 선언
    const fns = arguments;

    return function (arg) {
        // reduce는 클로저(비공개변수 fns를 갖는다)
        return _reduce(fns, function (arg, fn) {
            return fn(arg);
        }, arg)
    }
}

// 2-9. _go
function _go(arg) {
    // 유사배열을 배열로 
    const fns = _rest(arguments);
    // _pipe를 호출하여 실행
    return _pipe.apply(null, fns)(arg);
}