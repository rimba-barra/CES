Ext.define('Hrd.view.approvalmatrix.FormApplyToDoc', {
    alias: 'widget.approvalmatrixformapplytodoc',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.approvalmatrix.GridApprovalContract'],
    frame: true,
    autoScroll: true,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'combobox',
                    name: 'periode',
                    fieldLabel: 'Periode',
                    width: 180,
                    displayField: 'periode',
                    valueField: 'periode',
                    readOnly: false,
                    allowBlank: false,
                    matchFieldWidth: false
                },
                //added by anas 15012024
                {
                    xtype: 'approvalmatrixgridapprovalcontract',                    
                    height: 150,
                    style: 'padding: 10 0 10 0',
                    name: 'gridapprovalcontract',
                    hidden: true
                }

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});