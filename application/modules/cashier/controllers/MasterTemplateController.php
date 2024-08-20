<?php

require_once dirname(__DIR__) . '../library/apli/ApliCashierController.php';

class Cashier_MasterTemplateController extends ApliCashierController {

    public function init() {
        $this->setDao(new Cashier_Models_Master_TemplateDao());
        $this->setValidator(new Cashier_Models_Validator_DefaultValidator());
        $this->setObject(new Cashier_Models_Master_Kasbank());
        $validator = $this->getValidator();
        $validator->controller = $this;
    }

    public function detailRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $request->setModule('masterclosing');
        $dao = $this->getDao();
        $projectHasil = $dao->getCustomReadDirectModule('voucher', 'detailproject', $request, $session);
        $projectModel = Apli::generateExtJSModelDirectWithDetail('multiproject', array('user', 'project'));
        return array(
            "data" => array(
                "project" => array(
                    "model" => $projectModel,
                    "data" => $projectHasil[0]
                ),
                "ptid" => $session->getPt()->getId(),
            ),
        );
    }

    public function checktemplateRead() {

        $params = $this->getRequest()->getPost();
        $session = Apli::getSession();
        $request = Apli::getRequest($params);
        $user_id = $session->getUser()->getId();
        $template = $this->getDao()->getCustomReadDirectModule('global', 'checktemplate', $request, $session);
        $app_path = str_replace("application", "", APPLICATION_PATH);
        $result = FALSE;




        if ($template) {

            $result = $template[0][0]['result'];
            $file = $app_path . 'public/app/cashier/reportjs_user/' . $template[0][0]['result'] . '.mrt';
            
   
            
            if (!file_exists($file)) {

                $myfile = fopen($file, "wb") or die("Unable to open file!");
                $xml = $template[0][0]['xml'];
                fwrite($myfile, $xml);
                fclose($myfile);
            }
        }



        return array(
            "data" => array(
                "templatedetail_id" => $result,
            ),
        );
    }

    public function savetemplateRead() {
        $result = 1;

        $params = $this->getRequest()->getPost();

        $app_path = str_replace("application", "", APPLICATION_PATH);
        $file = $app_path . 'public/app/cashier/reportjs_user/' . $params['template_id'] . '.mrt';
        $myfile = fopen($file, "wb") or die("Unable to open file!");
        $xml = $params['json'];
        fwrite($myfile, $xml);
        fclose($myfile);


        return array(
            "data" => array(
                "status" => $result,
            ),
        );
    }

}
