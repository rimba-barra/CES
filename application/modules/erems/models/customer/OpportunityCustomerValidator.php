<?php

/**
 * Description of OpportunityCustomerValidator
 *
 * @author TOMMY-MIS
 */
class Erems_Models_Customer_OpportunityCustomerValidator extends Erems_Box_Models_App_Validator {

	private $ses;

	public function setSes($ses) {
		$this->ses = $ses;
	}

	public function run(Erems_Models_Master_OpportunityCustomer $customer) {
		$msg = "";
		//add by imaam on 28/06/2019
		$dao = new Erems_Models_Master_OpportunitycustomerDao();
		$homephoneExist = $dao->phoneExist($customer, $this->ses);
		$idExist = 0;
//        var_dump($homephoneExist[1][0]['Addon']);
//        var_dump($homephoneExist[1]);

		if ($homephoneExist) {
			if (count($homephoneExist[0]) > 0) {
				$idExist = $homephoneExist[0][0]['data'];
			}
		}

		if (strlen($customer->getName()) < 2) {
			$msg = "Name minimum 3 characters";
			// } else if (strlen($customer->getAddress()) < 5) {
			//   $msg = "Address minimum 5 characters";
		} else if (strlen($customer->getMobilePhone()) < 7 || !$this->isDigit($customer->getMobilePhone())) {
			$msg = "Mobile Phone 1 minimum 7 characters and digits only allowed";
		} else if ($idExist > 0 && $customer->getId() != $homephoneExist[1][0]['opportunitycustomer_id']) {
			$msg = "Phone already exists!! input by " . $homephoneExist[1][0]['user_fullname'] . " date " . $homephoneExist[1][0]['Addon'];
		} else {
			$this->setStatus(TRUE);
		}


		$this->setMsg($msg);
	}

}
