var mainApp = angular.module("uploadApp", []);
	         
	         mainApp.controller("UploadController", ['$scope','$http', function($scope,$http) {
	         	this.defaultFieldNames = {
	         		first: 'first_name'
	         	}

	         	$scope.initModel = function() {


		         	$scope.model = {
			         		fieldModel: {
				         		firstName: undefined,
				         		lastName: undefined,
				         		email: undefined
		         			},
		         			endStats: {
		         				total: 0,
				            	lastNames: 0,
				            	firstNames: 0,
				            	emails: 0,
				            	lastPct: '',
				            	firstPct: '',
				            	emailPct: ''
		         			},
		         			theFile: undefined,
		         			headerRow: '',
		         			fields: ''

		         	};

		         	$scope.showControls = {
		         		submitDisable: true,
		         		showStats: false,
		         		showMapping: false,
		         		showInstructions: true,
		         		showErr: false
		         	};

		      
		            $scope.records = undefined;

		            $scope.labels = {
		            	selectedText: 'Select',
		            	mappingInstructions: 'We will need you to do some work before submitting the file for us! Below is a list of three fields - first name, last name, and email. We need you to define for us which fields in your file correspond to these three fields.',
		            	introInstructions: 'Welcome to the CSV Analyzer. Please click the "Browse" button below and pick your CSV file. Your CSV file must be comma delimited.',
		            	title: 'CSV Analyzer',
		            	errMsg: 'There is something wrong with the file you are attempting to upload. Please choose anohter one or make changes to it.',
		            	first: 'First Name',
		            	last: 'Last Name',
		            	email: 'Email',
		            	fieldSep: ':',
		            	total: 'Total Records:',
		            	vLastNames: 'Valid Last Names:',
		            	vFirstNames: 'Valid First Names: ',
		            	vEmails: 'Valid Emails:',
		            	ofTotal: '% of Total',
		            	preview: 'Preview Data:',
		            	statistics: 'Statistics'
		            };
		        };
		        $scope.initModel();

	            $scope.submitForm = function() {

	            	var f = new FormData();
        			f.append('file', $scope.model.theFile);
        			f.append('first', $scope.model.fields.indexOf($scope.model.fieldModel.firstName));
        			f.append('last', $scope.model.fields.indexOf($scope.model.fieldModel.lastName));
        			f.append('email', $scope.model.fields.indexOf($scope.model.fieldModel.email));

        			$http.post('http://localhost:8080/evaluate', f, {
            			transformRequest: angular.identity,
            			headers: {'Content-Type': undefined},
			        })
			        .success(function(data){
			        	this.successHandler(data);
			        }.bind(this))
			        .error(function(err){
			        	console.log('error: ', err);
			        });	
	            };

	            $scope.successHandler = function(data) {
	            	$scope.records = data.previewData || [];
	            	$scope.model.endStats.total = data.total || 0;
	            	$scope.model.endStats.lastNames = data.lastNames || 0;
	            	$scope.model.endStats.firstNames = data.firstNames || 0;
	            	$scope.model.endStats.emails = data.validEmail || 0;


	            	$scope.model.endStats.lastPct = Number($scope.model.endStats.lastNames*100 / $scope.model.endStats.total).toFixed(2);
	            	$scope.model.endStats.firstPct = Number($scope.model.endStats.firstNames*100 / $scope.model.endStats.total).toFixed(2);
	            	$scope.model.endStats.emailPct = Number($scope.model.endStats.emails*100 / $scope.model.endStats.total).toFixed(2);

	            	$scope.showControls.showStats = true;
	            };

	            $scope.initModel = function() {

	            };

	            $scope.handleFile = function(file) {
	            	 $scope.model.fieldModel.firstName = -1;
	           		 $scope.model.fieldModel.lastName = -1;
	            	 $scope.model.fieldModel.email = -1;
	            	 $scope.showControls.submitDisable = true;
	            	 $scope.showControls.showStats = false;
	            	 $scope.showControls.showErr = false;


	            	 $scope.model.theFile = file;

	            	if (typeof $scope.model.headerRow === 'string') {	            		
	            		$scope.model.fields = $scope.model.headerRow.split(',');

	            		if ($scope.model.fields.length && $scope.model.fields.length >=3) {

	            			$scope.handleMapping();

	            			$scope.$apply(function() {
	            				$scope.showControls.showMapping = true;
	            				$scope.showControls.showInstructions = false;
	            			});

	            		} else {
	            			$scope.$apply(function() {
	            				$scope.showControls.showErr = true;
	            				$scope.showControls.showInstructions = false;
	            			});
	            			
	            		}
	            	}
	            }

	            $scope.handleMapping = function() {
	            	if ($scope.model.fieldModel.firstName !== -1 && $scope.model.fieldModel.lastName !== -1 && $scope.model.fieldModel.email !== -1) {
	            		$scope.showControls.submitDisable = false;
	            	}
	            }
	         }]);

	         mainApp.directive("onFileSelect",function(){    
			  return {

			    link: function($scope, element, attrs){          
			      element.bind('change', function(element){
			      	
			      	if (element.target.files) {
			      		
			      		var reader = new FileReader();
			      		reader.readAsText(element.target.files[0]);
			      		reader.onload = function(elem) {
			      			var contents = elem.target.result ? elem.target.result.split('\n') : [];
			      			$scope.model.headerRow = contents.length ? contents[0] : [];
			      			$scope.handleFile(element.target.files[0]);
			      		}
			      	}
			      });          
			    }        
			  }
			});
