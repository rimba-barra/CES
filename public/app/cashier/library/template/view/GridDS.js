/*
 * @name GridDS [ Grid Dynamic Store]
 * @extend Cashier.library.template.view.Grid
 * 
 */
Ext.define('Cashier.library.template.view.GridDS', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.templateviewgridds',
    createStore: function(ctrl,id,idProperty,extraParams,fieldgrouping) {
        var me = this;
        var s = me.getStore();
        var idP = typeof idProperty==="undefined"?"kosong_id":idProperty;
        var eP = typeof extraParams==="undefined"?null:extraParams;
        var gP = typeof fieldgrouping==="undefined"?null:fieldgrouping;
   
        if (s.storeId === 'ext-empty-store') {
            var x = null;
            if(eP !== null){
                x = ctrl.instantStore({
                    id: id,
                    idProperty:idP,
                    extraParams:eP,
                    fieldgrouping:gP
                });
            }else{
                x = ctrl.instantStore({
                    id: id,
                    idProperty:idP,
                    fieldgrouping:gP
                });
            }
            //me.store = x;
            me.reconfigure(x);
        }
    }
});