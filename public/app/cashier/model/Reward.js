Ext.define('Cashier.model.Reward', {
    extend    : 'Ext.data.Model',
    alias     : 'model.rewardmodel',
    idProperty: 'purchaseletter_reward_id',
    fields    : [
        {name: 'purchaseletter_reward_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'purchaseletter_no', type: 'string'},
        {name: 'unit_no', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'reward_name', type: 'string'},
        {name: 'amount', type: 'string'},        
    ]
});