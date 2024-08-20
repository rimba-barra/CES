Ext.define('Hrd.view.perspectivepercentage.FormDetail', {
    alias           : 'widget.perspectivepercentageformdetail',
    extend          : 'Hrd.library.box.view.FormData',
    frame           : true,
    autoScroll      : true,
    editedRow       : -1,
    deletedData     : {},
    initComponent   :  function() {
        var me  = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults    : {},
            items       : [{
                xtype       : 'textfield',
                name        : 'project_id',
                readOnly    : true,
                fieldLabel  : 'Project',
                width       : 360
            }, {
                xtype       : 'textfield',
                name        : 'pt_id',
                readOnly    : true,
                fieldLabel  : 'PT',
                width       : 360
            }, {
                xtype       : 'textfield',
                name        : 'department_id',
                readOnly    : true,
                fieldLabel  : 'Department',
                width       : 360
            }, {
                xtype       : 'combobox',
                name        : 'perspective_id',
                fieldLabel  : 'Perspective',
                displayField: 'perspective',
                valueField  : 'perspective_id',
                width       : 360
            }, {
                xtype       : 'hiddenfield',
                name        : 'code',
                valueField  : 'code'
            }, {
                xtype           : 'numberfield',
                fieldLabel      : 'Percentage',
                name            : 'percentage',
                value           : 0,
                minValue        : 0,
                maxValue        : 100,
                stepValue       : 5
            }],
        });

        me.callParent(arguments);
    }
});