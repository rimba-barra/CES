Ext.define('Hrd.view.rangkingpa.FormData', {
    alias: 'widget.rangkingpaformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'shifttype_id'
                },
                {
                    name:'name',
                    fieldLabel:'Rangking'
                },
                {
                    name:'point',
                    fieldLabel:'Point',
                    width:200
                },
                {
                    name:'percent',
                    width:200,
                    fieldLabel:'[%] Employee'
                },
                {
                    xype:'textareafield',
                    name:'description',
                    grow      : true,
                     anchor    : '100%',
                    fieldLabel:'Description'
                }

            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled:true,
                     action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'
                
            ]
        });

        me.callParent(arguments);
    }
   
});