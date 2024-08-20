<?php

class Erems_Box_Library_Customplcontroller extends Erems_Box_Library_Tiket_TicketProccesor{
    
	protected function procces()
	{
		$result = '';
		$model = new Erems_Models_Purchaselettertb();
		
		$post_data = array();
		$post_data['purchaseletter_id'] = $this->getRequest()->getPost('purchaseletter_id');
		$post_data['mode_read'] = $this->getRequest()->getPost('mode_read');
		$post_data['param_spcreq'] = $this->getRequest()->getPost('param_spcreq');
		$post_data['param_scheduletype'] = $this->getRequest()->getPost('param_scheduletype');
		
		if($post_data['mode_read']=='detail'){
			if($post_data['param_scheduletype']){
				$result = $model->purchaseletterdetailwithpaymentRead($post_data);
			}
        }else if($post_data['param_spcreq']){
			$post_data['start'] = $this->getRequest()->getPost('start');
            $post_data['limit'] = $this->getRequest()->getPost('limit');
			$post_data['page'] = $this->getRequest()->getPost('page');
			$post_data['purchaseletter_no'] = $this->getRequest()->getPost('purchaseletter_no');
			$post_data['purchase_date'] = $this->getRequest()->getPost('purchase_date');
			$post_data['unit_id'] = $this->getRequest()->getPost('unit_id');
			$post_data['customer_id'] = $this->getRequest()->getPost('customer_id');
			$post_data['collector_id'] = $this->getRequest()->getPost('collector_id');
			$post_data['salesman_id'] = $this->getRequest()->getPost('salesman_id');
			$post_data['block_id'] = $this->getRequest()->getPost('block_id');
			$post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
            $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
            $post_data['cluster_code'] = $this->getRequest()->getPost('cluster_code');
            $result = $model->purchaseletterv2Read($post_data);
		}
		
		return $result; 	
	}
	
}

?>
