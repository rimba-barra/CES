/*
 * @name GridDS [ Grid Dynamic Store]
 * @extend Master.library.template.view.Grid
 * 
 */
Ext.define('Master.library.template.view.GridDS', {
    extend: 'Master.library.template.view.Grid',
    alias: 'widget.templateviewgridds',
    createStore: function(ctrl,id,idProperty,extraParams) {
        var me = this;
        var s = me.getStore();
        var idP = typeof idProperty==="undefined"?"kosong_id":idProperty;
        var eP = typeof extraParams==="undefined"?null:extraParams;
        if (s.storeId === 'ext-empty-store') {
            var x = null;
            if(eP !== null){
                x = ctrl.instantStore({
                    id: id,
                    idProperty:idP,
                    extraParams:eP
                });
            }else{
                x = ctrl.instantStore({
                    id: id,
                    idProperty:idP
                });
            }
            //me.store = x;
            me.reconfigure(x);
        }
    }
});