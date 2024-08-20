Ext.define('Hrd.view.kelompokabsensi.FormDataDetail', {
    alias: 'widget.kelompokabsensiformdatadetail',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
        //var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'kelompokabsensi_detail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelompokabsensi_id',
                },
                {
                    xtype: 'textfield',
                    name: 'employee_id',
                    fieldLabel: 'Employee ID',
                    anchor: '50%',
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                },
                {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Employee Name',
                    anchor: '50%',
                    hideTrigger: true,
                    keyNavEnabled: false,
                    mouseWheelEnabled: false,
                    readOnly: false,
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});