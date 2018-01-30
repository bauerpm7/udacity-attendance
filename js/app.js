$(function () {
	let model = {
		students:[
			{name: 'Slappy the Frog' , daysMissed: 0},
			{name: 'Lilly the Lizard' , daysMissed: 0},
			{name: 'Paulrus the Walrus' , daysMissed: 0},
			{name: 'Gregory the Goat' , daysMissed: 0},
			{name: 'Adam the Anaconda' , daysMissed: 0},
			{name: 'Henry the Hippo', daysMissed:0}
		],
		schoolDays: 15,

		init: function() {

			if(!localStorage.attendance) {
				console.log('Creating attendance records...');
				var attendance = {};
				let names = [];

				this.students.forEach(function(student){
					names.push(student.name);
				});
			
				names.forEach(function(name){
					attendance[name] = [];
					console.log(model.schoolDays);
					for  (let i = 0; i < model.schoolDays; i++){
						attendance[name].push(false);
					}
				});
			}
			localStorage.attendance = JSON.stringify(attendance);
		},
	};

	let octopus = {
		init: function() {
			headerView.init();
			model.init();
			tableView.init();
		},

		getStudents: function() {
			return model.students;
		},

		getSchoolDays: function() {
			return model.schoolDays;
		},


	};

	let headerView = {
		init: function() {
			this.render();
		},

		render: function() {
			let schoolDays = octopus.getSchoolDays();
			for (let i = 1; i <= schoolDays; i++){
				$('.header-row').append('<th>'+ i + '</th>');
			}
			$('.header-row').append('<th class="missed-col">Days Missed</th>');

		}
	};

	let tableView = {
		init: function() {
			this.makeStudentRow();
			this.attendance = JSON.parse(localStorage.attendance);
			this.studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr');
			this.dayChecks = $(this.studentRow).children('.attend-col').children('input');
			//this.updateAttendance();
		},

		addCheckBoxes: function() {
			let schoolDays = octopus.getSchoolDays();
			for (let i = 0; i < schoolDays; i++) {
				$('.student').append('<td class="attend-col"><input type="checkbox"></td>');
			}
		},

		makeStudentRow: function() {
			let students = octopus.getStudents();
			students.forEach(function(student){
				$('.table-body').append('<tr class = "student"><td class="name-col">' + student.name + '</td></tr>');
			});
			this.addCheckBoxes();
			$('.student').append('<td class="missed-col">0</td>');
		},

		// updateAttendance: function(){
		// 	this.getAttendance.forEach(function(day){
		// 		this.dayChecks.each(function(i) {
		// 			$(this).prop('checked', day[i]);
		// 		});
		// 	});

		// }


	};

	octopus.init();
});