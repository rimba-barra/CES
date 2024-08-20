<?php

ini_set('max_execution_time', 0);

require_once dirname(__DIR__) . '../library/pthreads/Pthreads.php';

class Gl_ProsespostingController extends Zend_Controller_Action {

    function createAction() {   

    	$this->getResponse()->setHeader('Content-Type', 'application/json');
        $result = array('data' => array(), 'total' => 0, 'success' => false);
        $post_data = Zend_Json::decode($this->getRequest()->getPost('data'));

        switch ($post_data['hideparam']) {
            case 'defaultrange':
				$model = new Gl_Models_Prosesposting();
       			$result = $model->dataCreate($post_data);
                break;
            default:
            	//update flag posting
		        $startdate = $post_data['fromdate']; 
		        $enddate = $post_data['untildate']; 
		        $month_start = intval(date("m",strtotime($startdate)));
		        $year_start = intval(date("Y",strtotime($startdate)));
		        $month_end = intval(date("m",strtotime($enddate)));
		        $year_end = intval(date("Y",strtotime($enddate)));

		        $months = $month_end-$month_start;

		        // if($months<=3){ // jadul tidak dipakai
		        if($months>=999){ // jadul tidak dipakai
		        	for($i=$month_start; $i<=$month_end; $i++){
			        	$ii = str_pad($i, 2, '0', STR_PAD_LEFT);
						$first_day_this_month = date($year_start.'-'.$ii.'-01');
						$last_day_this_month  = date("Y-m-t", strtotime($first_day_this_month));
						$post_data['fromdate'] = $first_day_this_month;
						$post_data['untildate'] = $last_day_this_month;

						$model = new Gl_Models_Prosesposting();
			       		$result = $model->dataCreate($post_data);
			        }
		        }else{
			        	$hideparam = $post_data['hideparam'];
			        	$stack = array();
			        	$model = new Gl_Models_Prosesposting();
			        	
			        	if($hideparam=='default'):

			        	    $post_data['hideparam'] = 'update_flag_posting_thread';
		       				$query = $model->dataCreate($post_data)['counter'];
		       				$stack[] = new Pthreads($query);

						else :

			        		for($i=$month_start; $i<=$month_end; $i++){
					        	$ii = str_pad($i, 2, '0', STR_PAD_LEFT);
								$first_day_this_month = date($year_start.'-'.$ii.'-01');
								$last_day_this_month  = date("Y-m-t", strtotime($first_day_this_month));
								$post_data['fromdate'] = $first_day_this_month;
								$post_data['untildate'] = $last_day_this_month;
								$post_data['month'] = $i;
								$post_data['year'] = $year_start;

								//RE-INIT POSTING ALL WITHOUT LR
								if($hideparam=='newgeneration_thread') {
									$post_data['hideparam'] = 'newgeneration_thread';
					       			$query = $model->dataCreate($post_data)['counter'];
					       			$stack[] = new Pthreads($query);
					       		}

				       			//RE-INIT GENERATE LR
				       			if($hideparam=='lr_creator_thread') {
									$post_data['hideparam'] = 'lr_creator_thread';
						       		$query = $model->dataCreate($post_data)['counter'];
						       		$stack[] = new Pthreads($query);
						       	}

					       		//RE-INIT POSTING WITH LR FULL MONTH
					       		if($hideparam=='newgeneration_thread_end') {
							        $post_data['fromdate'] = $first_day_this_month;
									$post_data['untildate'] = $last_day_this_month;
					        		$model = new Gl_Models_Prosesposting();
					        		$post_data['hideparam'] = 'newgeneration_thread';
						       		$query = $model->dataCreate($post_data)['counter'];
						       		$stack[] = new Pthreads($query);
						       		$post_data['hideparam'] = 'newgeneration_thread_end';
						       	}

					        }

					        endif;

					        //RUN THE THREADS
					        foreach ( $stack as $t ) {
							    $res = $t->start();
							}
						
							if($res){
					            $mesg = "Success";
					            $flag =  1;
					        }else{
					            $mesg = "Failed";
					            $flag =  0;
					        }

					        $result =  array("mesg" => $mesg, "counter" => $flag, "parameter" => $post_data['hideparam']);


		        }

                break;
                }

        echo Zend_Json::encode($result);
        $this->_helper->viewRenderer->setNoRender(true);
    }

}

?>