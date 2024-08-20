Ext.define('Hrd.view.workgroupemployee.FormDataDetailShift', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.workgroupemployeeformdatadetailshift',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'workgroup_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'workgroupdetailshift_id',
                },
                {
                    xtype: 'hiddenfield',
                    name: 'shifttype',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Squence',
                    itemId: 'fd_indexdata',
                    id: 'indexdata',
                    name: 'indexdata',
                    emptyText: 'Sort / Squence',
                    width: 200,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'shifttypecombobox',
                    fieldLabel: 'Shift Type',
                    itemId: 'fd_shifttype_id' + me.uniquename,
                    id: 'shifttype_id' + me.uniquename,
                    name: 'shifttype_id',
                    width: 300,
                    emptyText: 'Shift Type',
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    matchFieldWidth: false,
                    queryMode: 'local',
                    tpl: Ext.create('Ext.XTemplate',
                            '<table class="x-grid-table" width="500px" >',
                            '<tr class="x-grid-row">',
                            '<th width="100px"><div class="x-column-header x-column-header-inner">Code</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Shift</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">In</div></th>',
                            '<th width="200px"><div class="x-column-header x-column-header-inner">Out</div></th>',
                            '</tr>',
                            '<tpl for=".">',
                            '<tr class="x-boundlist-item">',
                            '<td ><div class="x-grid-cell x-grid-cell-inner">{code}</div></td>',
                            '<td><div class="x-grid-cell x-grid-cell-inner">{shifttype}</div></td>',
                            '<td><div class="x-grid-cell x-grid-cell-inner">{in_time}</div></td>',
                            '<td><div class="x-grid-cell x-grid-cell-inner">{out_time}</div></td>',
                            '</tr>',
                            '</tpl>',
                            '</table>'
                            ),
                },
		{
                    xtype: 'checkboxfield',
                    fieldLabel: 'Set Day Of Week',
                    itemId: 'fd_status_dayofweek',
                    name: 'status_dayofweek',
                    boxLabel: 'Use Day of Week',
                    padding: '0 0 0 0',
                    margin: '0 0 0 0',
                    boxLabelCls: 'x-form-cb-label small',
                    inputValue: '1',
                    uncheckedValue: '0',
                    checked: false
                },		
                {
                    xtype: 'textfield',
                    fieldLabel: 'Counter of Days',
                    itemId: 'fd_counterdays',
                    id: 'counterdays',
                    name: 'counterdays',
                    emptyText: 'Counter',
                    width: 250,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

