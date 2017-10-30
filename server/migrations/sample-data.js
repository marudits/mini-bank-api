module.exports = {
	'Department': [
		{
			name: 'DEP-001'
		},
		{
			name: 'DEP-002'
		}
	],
	'Position': [
		{
			name: 'POS-001-DEP-001',
			departmentId: 1
		},
		{
			name: 'POS-002-DEP-001',
			departmentId: 1
		},
		{
			name: 'POS-003-DEP-002',
			departmentId: 2
		}
	],
	'Employee': [
		{
			name: 'EMP-001-POS-001',
			positionId: 1,
			departmentId: 1,
			email: 'emp-001@mail.com',
			phone: '0310000001',
			ext: '001'
		},
		{
			name: 'EMP-002-POS-001',
			positionId: 1,
			departmentId: 1,
			email: 'emp-002@mail.com',
			phone: '0310000002',
			ext: '002'
		},
		{
			name: 'EMP-003-POS-002',
			positionId: 2,
			departmentId: 1,
			email: 'emp-003@mail.com',
			phone: '0310000003',
			ext: '003'
		}
	],
	'Bank': [
		{
			name: 'Hong Leong Bank',
			address: 'Jl. Tun Perak, Kuala Lumpur, Malaysia',
			location: {
				lat: '',
				lng: ''
			},
			favourites: 0,
			officeHours: ['08:45', '17:45'],
			officeDays: [1,2,3,4,5],
			rating: 0
		},
		{
			name: 'Maybank Bank',
			address: 'Masjid Jamek, Kuala Lumpur, Malaysia',
			location: {
				lat: '',
				lng: ''
			},
			favourites: 0,
			officeHours: ['09:05', '18:00'],
			officeDays: [1,2,3,4,5],
			rating: 0
		},
		{
			name: 'CIMB Niaga Syariah',
			address: 'Sentul, Malaysia',
			location: {
				lat: '',
				lng: ''
			},
			favourites: 0,
			officeHours: ['08:45', '17:45'],
			officeDays: [0,1,2,3,4,5,6],
			rating: 0
		}
	],
	'Rating': [
		{
			bankId: 1,
			name: 'Marudi Tri Subakti',
			email: 'marudits@gmail.com',
			text: 'Lorem ipsum dolor sit amet',
			value: 4
		}
	],
	'CallHistory': [
		{
			callerId: 'IMEI-EMP-001',
			calleeId: 2
		},
		{
			callerId: 'IMEI-EMP-001',
			calleeId: 3
		},
		{
			callerId: 'IMEI-EMP-001',
			calleeId: 2
		}
	],
	'Category': [
		{
			id: 1,
			value: 'APP_TYPE',
			description: 'Specify app type'
		},
		{
			id: 2,
			value: 'BANK_ACTIONS',
			description: 'Category for Bank Actions'
		},
		{
			id: 3,
			value: 'RATING_ACTIONS',
			description: 'Category for Rating Actions'
		},
		{
			id: 4,
			value: 'CONTACT_ACTIONS',
			description: 'Category for Contact Actions'
		},
		{
			id: 5,
			value: 'PLATFORM_TYPE',
			description: 'Specify platform type'
		}
	],
	'Reference': [
		{
			categoryId: 1,
			value: 'API',
			type: [1,2,3],
			description: 'API service'
		},
		{
			categoryId: 1,
			value: 'WEB',
			type: [1,2,3],
			description: 'Web for Admin Page'
		},
		{
			categoryId: 1,
			value: 'MOBILE',
			type: [1,2,3],
			description: 'Mobile application'
		},
		{
			categoryId: 2,
			value: 'NAVIGATE',
			type: [1,3],
			description: 'BANK_ACTIONS: NAVIGATE'
		},
		{
			categoryId: 2,
			value: 'CALL',
			type: [1,3],
			description: 'BANK_ACTIONS: CALL'
		},
		{
			categoryId: 2,
			value: 'REVIEW',
			type: [1,3],
			description: 'BANK_ACTIONS: REVIEW'
		},
		{
			categoryId: 2,
			value: 'FAVOURITE',
			type: [1,3],
			description: 'BANK_ACTIONS: FAVOURITE'
		},
		{
			categoryId: 2,
			value: 'ADD',
			type: [1,2],
			description: 'BANK_ACTIONS: ADD'
		},
		{
			categoryId: 2,
			value: 'UPDATE',
			type: [1,2],
			description: 'BANK_ACTIONS: UPDATE'
		},
		{
			categoryId: 2,
			value: 'DELETE',
			type: [1,2],
			description: 'BANK_ACTIONS: DELETE'
		},
		{
			categoryId: 2,
			value: 'DETAIL',
			type: [1,2],
			description: 'BANK_ACTIONS: DETAIL'
		},
		{
			categoryId: 3,
			value: 'REPORT',
			type: [1,2],
			description: 'RATING_ACTIONS: REPORT'
		},
		{
			categoryId: 3,
			value: 'ADD',
			type: [1,3],
			description: 'RATING_ACTIONS: ADD'
		},
		{
			categoryId: 3,
			value: 'DELETE',
			type: [1,2],
			description: 'RATING_ACTIONS: DELETE'
		},
		{
			categoryId: 3,
			value: 'DETAIL',
			type: [1,2],
			description: 'RATING_ACTIONS: DETAIL'
		},
		{
			categoryId: 4,
			value: 'CALL',
			type: [1,3],
			description: 'CONTACT_ACTIONS: CALL'
		},
		{
			categoryId: 4,
			value: 'FAVOURITE',
			type: [1,3],
			description: 'CONTACT_ACTIONS: FAVOURITE'
		},
		{
			categoryId: 4,
			value: 'ADD',
			type: [1,2],
			description: 'CONTACT_ACTIONS: ADD'
		},
		{
			categoryId: 4,
			value: 'UPDATE',
			type: [1,2],
			description: 'CONTACT_ACTIONS: UPDATE'
		},
		{
			categoryId: 4,
			value: 'DELETE',
			type: [1,2],
			description: 'CONTACT_ACTIONS: DELETE'
		},
		{
			categoryId: 4,
			value: 'DETAIL',
			type: [1,2],
			description: 'CONTACT_ACTIONS: DETAIL'
		},
		{
			categoryId: 5,
			value: 'ANDROID',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: ANDROID'
		},
		{
			categoryId: 5,
			value: 'IOS',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: IOS'
		},
		{
			categoryId: 5,
			value: 'WEB',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: WEB'
		}
	]
}