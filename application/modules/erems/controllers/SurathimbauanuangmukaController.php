<?php 


class Erems_SurathimbauanuangmukaController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);
        
        $post_data['page'] = $this->getRequest()->getPost('page');
        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');

        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['customer_name'] = $this->getRequest()->getPost('customer_name');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
        $post_data['block_id'] = $this->getRequest()->getPost('block_id');
        
        $read_type = $this->getRequest()->getPost('read_type');

        $model = new Erems_Models_Surathimbauanuangmuka();
        
        if($read_type == 'printout'){
            $result = $this->printout($this->getRequest()->getPost('id'), $this->getRequest()->getPost('document_name'));
        }else{
            $result = $model->surathimbauanuangmukaRead($post_data, 'grid', 1);
        }
        
        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function printout($id, $document_name){
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $model = new Erems_Models_Surathimbauanuangmuka();

        $post_data['purchaseletter_id'] = $id;

        $res = $model->surathimbauanuangmukaRead($post_data);

        if(count($res['data']) > 0){
            $p = new Erems_Box_Library_MyWordParser();
            $fileSrc = 'surat_himbauan_uang_muka/'.$document_name;
            
            $finalFile = 'SURAT_HIMBAUAN_UANG_MUKA'.time().'.docx';
            $ok = $p->printDoc($fileSrc, $finalFile, $res['data'][0]);

            $pathUrl = $p->getUrl();
            
            if($ok){
                $result['success'] = true;
                $result['url'] = $pathUrl;
            } else {
                $result['success'] = false;
            }           
        } else {
            $result['success'] = false;
        }

        return $result;
    }
}
?>