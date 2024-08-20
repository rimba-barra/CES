Ext.define('Hrd.controller.Absenttype', {
    extend: 'Hrd.template.ControllerForMaster',
    alias: 'controller.Absenttype',
    controllerName: 'absenttype',
    fieldName: 'absenttype',
    bindPrefixName: 'Absenttype',
    fdarInit: function() {
        var me = this;
        var f = me.getFormdata();
        var cb = ["absenttypegroup_absenttypegroup_id"];
        for (var c in cb) {
            f.down("[name=" + cb[c] + "]").bindPrefixName = me.controllerName;
            f.down("[name=" + cb[c] + "]").doInit(true, function() {

            });
        }
    }
});