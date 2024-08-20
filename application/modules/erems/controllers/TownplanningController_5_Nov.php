<?php

class Erems_TownplanningController extends Zend_Controller_Action {

    function readAction() {

        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data['start'] = $this->getRequest()->getPost('start');
        $post_data['limit'] = $this->getRequest()->getPost('limit');
        $post_data['cluster_id'] = $this->getRequest()->getPost('cluster_id');
        $post_data['unit_number'] = $this->getRequest()->getPost('unit_number');
        $post_data['productcategory_id'] = $this->getRequest()->getPost('productcategory_id');
        $post_data['type_id'] = $this->getRequest()->getPost('type_id');
        $post_data['block_id'] = $this->getRequest()->getPost('block_id');
        $post_data['position_id'] = $this->getRequest()->getPost('position_id');
        $post_data['side_id'] = $this->getRequest()->getPost('side_id');
        $post_data['purpose_id'] = $this->getRequest()->getPost('purpose_id');
        $post_data['state_admistrative'] = $this->getRequest()->getPost('state_admistrative');
        $post_data['progress_min'] = $this->getRequest()->getPost('bot_progress');
        $post_data['progress_max'] = $this->getRequest()->getPost('top_progress');
        $post_data['unit_id'] = !$this->getRequest()->getPost('unit_id')?NULL:$this->getRequest()->getPost('unit_id');


        $model_townplanning = new Erems_Models_Townplanning();
        $result = $model_townplanning->townplanningRead($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function createAction() {



        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $number_check = $post_data['number_check'];

        $number_start = $post_data['number_start'];
        $number_end = $post_data['number_end'];
        $group_number = array();
        ///*** NUMBER GENERATOR FUNCTION ***/////////////
        if (intval($number_check) == 1) {
            $a = $number_start;
            $b = $number_end;
            $huruf = '';
            $hasil_a = 0;
            $hasil_b = 0;
            $number_generate = $post_data['mode_number_generator'];
            $validNumber = 0;
            preg_match_all('!\d+!', $a, $hasil_a);
            preg_match_all('!\d+!', $b, $hasil_b);
            $hasil_a = $hasil_a[0][0];
            $hasil_b = $hasil_b[0][0];
            $validNumber = intval($hasil_a);
            $validNumberb = intval($hasil_b);
            $huruf = str_replace($hasil_a, '', $a);

            if (($validNumberb > 0) && ($validNumberb >= $validNumber)) {
                for ($i = $validNumber; $i <= $validNumberb; $i++) {
                    if ($number_generate == 'GENAP') {
                        if ($i % 2 == 0) {
                            $group_number[] = $huruf . $i;
                        }
                    } else if ($number_generate == 'GANJIL') {
                        if ($i % 2 == 1) {
                            $group_number[] = $huruf . $i;
                        }
                    } else if ($number_generate == 'ALL') {
                        $group_number[] = $huruf . $i;
                    }
                }
            }
        } else {
            $group_number[] = $number_start;
        }

        //**** END NUMBER GENERATOR FUNCTION **/////////
        $post_data['state_admistrative'] = 1;
        $model_townplanning = new Erems_Models_Townplanning();
        if (count($group_number) > 0) {
            /// TO DO WITH GROUP NUMBER HERE
            if (intval($number_check) == 1) { //// jika membuat lebih dari satu record
                foreach ($group_number as $row) {
                    $post_data['unit_number'] = $row;
                    $result = $model_townplanning->townplanningCreate($post_data);
                }
            } else {
                $post_data['unit_number'] = $group_number[0];
                $result = $model_townplanning->townplanningCreate($post_data);
            }
        }


        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function updateAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));
        $post_data['unit_number'] = $post_data['number_start'];
        $mode_townplanning = new Erems_Models_Townplanning();
        $result = $mode_townplanning->townplanningUpdate($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }

    function deleteAction() {
        $this->getResponse()->setHeader('Content-Type', 'application/json');

        $result = array('data' => array(), 'total' => 0, 'success' => false);

        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        $mode_townplanning = new Erems_Models_Townplanning();
        $result = $mode_townplanning->townplanningDelete($post_data);

        echo Zend_Json::encode($result);

        $this->_helper->viewRenderer->setNoRender(true);
    }
    
    

}

?>
