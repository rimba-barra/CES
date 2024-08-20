<?php 

	// BY DAVID MIS
	
	require_once dirname(__DIR__) . '../../library/dompdf2/autoload.inc.php';
	use Dompdf\Dompdf;
	use Dompdf\Options;

	class Erems_Models_Suratreservation_Default {

		public function createPDF($html, $reservationID){
			$fileName = 'reservation_'.$reservationID.'.pdf';
			$filePath = APPLICATION_PATH . '/../public/app/erems/uploads/pdf/reservation/' . $fileName;
			$fileUrl = 'app/erems/uploads/pdf/reservation/' . $fileName;
			$options = new Options();
			$options->set('defaultFont', 'Arial');
			$options->setIsRemoteEnabled(true);

			$dompdf = new Dompdf($options);
			$dompdf->setPaper('A4', 'portratit');
			$dompdf->loadHtml($html);
			$dompdf->render();
			$output = $dompdf->output();
    		if(file_put_contents($filePath, $output)){
    			return $fileUrl;
    		}else{
    			return 0;
    		}
		}
    
	    public function getHTML() {

	        $html = "
	        	<style>
	        		body{
						padding: 70px;
	        		}
	        		.title{
	        			text-align: center;
	        		}
	        	</style>


	        	<p style='text-align: center;'><strong>FORMULIR KONFIRMASI UNIT</strong></p>
				<p style='text-align: center;'><strong><img src='https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/102011/logo_ciputra-2.ai_.png' alt='' width='89' height='89' /></strong></p>
				<p style='text-align: center; font-style:italic'>Terima kasih, Anda telah memilih produk Ciputra Group <br>sebagai hunian bagi keluarga anda.</p>
				<p style='text-align: center;'>Booking no : {reservation_no}</p>
				<hr>
				<table style='width: 438px;'>
				<tbody>
				<tr>
				<td style='width: 130px;'>Nama</td>
				<td style='width: 294px;'> : {customer_name}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Alamat</td>
				<td style='width: 294px;'> : {customer_address}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>No.Telp/Hp</td>
				<td style='width: 294px;'> : {customer_phone}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Email</td>
				<td style='width: 294px;'> : {customer_email}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Nama Cluster</td>
				<td style='width: 294px;'> : {cluster}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Nama Tipe</td>
				<td style='width: 294px;'> : {type_name}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Blok/Nomor</td>
				<td style='width: 294px;'> : {unit_number}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>LB/LT</td>
				<td style='width: 294px;'> : {building_size} M2 / {land_size} M2</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Harga Jual</td>
				<td style='width: 294px;'> : Rp. {hargajual}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Cara Bayar</td>
				<td style='width: 294px;'> : {pricetype}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Booking Fee</td>
				<td style='width: 294px;'> : {booking_fee}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Informasi</td>
				<td style='width: 294px;'> : {mediapromotion}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Uang Titipan</td>
				<td style='width: 294px;'> : Rp. {uang_titipan}</td>
				</tr>
				<tr>
				<td style='width: 130px;'>Catatan</td>
				<td style='width: 294px;'> : {notes}</td>
				</tr>
				</tbody>
				</table>
				<p>&nbsp;</p>
				<p>Tanda Tangan,<br /><br /><br /></p>
				<table style='width: 577px;'>
				<tbody>
				<tr>
				<td style='width: 150px; text-align: center;'>(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; )</td>
				<td style='width: 200px; text-align: center;'>(&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; )</td>
				<td style='width: 200px; text-align: center;'>( {customer_name} )</td>
				</tr>
				<tr>
				<td style='width: 150px; text-align: center;'>Marketing</td>
				<td style='width: 200px; text-align: center;'>Marketing Manager</td>
				<td style='width: 200px; text-align: center;'>Pembeli</td>
				</tr>
				</tbody>
				</table>
	        ";
			return $html;
	    }
    
	}
