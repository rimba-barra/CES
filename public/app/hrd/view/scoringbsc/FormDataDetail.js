Ext.define('Hrd.view.scoringbsc.FormDataDetail', {
    alias: 'widget.scoringbscformdatadetail',
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
                    name: 'scoringbsc_detail_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'scoringbsc_id',
                },
                {
                    xtype: 'numberfield',
                    name: 'rating',
                    fieldLabel: 'Rating',
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
                    xtype: 'numberfield',
                    name: 'batas_bawah',
                    fieldLabel: 'Batas Bawah',
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
                    xtype: 'numberfield',
                    name: 'batas_atas',
                    fieldLabel: 'Batas Atas',
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
                    xtype: 'numberfield',
                    name: 'interval',
                    fieldLabel: 'Interval',
                    anchor: '50%',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    name: 'rating_range',
                    fieldLabel: 'Rating Range',
					maxLength : 100,
                    anchor: '100%'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});