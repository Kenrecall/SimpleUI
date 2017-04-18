export default [
    {
        "path":"/",
        component:function (resolve) {
            require(["./index.vue"], resolve);
        }
    },
    {
        "path":"/index",
        component:function (resolve) {
            require(["./index.vue"], resolve);
        }
    },
    {
        "path":"/grid",
        component:function (resolve) {
            require(["./grid.vue"], resolve);
        }
    },
    {
        "path":"/number",
        component:function (resolve) {
            require(["./number.vue"], resolve);
        }
    }
];