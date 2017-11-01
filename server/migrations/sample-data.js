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
			id: 1,
			categoryId: 1,
			value: 'API',
			key: 'APP_TYPE_API',
			type: [1,2,3],
			description: 'API service'
		},
		{
			id: 2,
			categoryId: 1,
			value: 'WEB',
			key: 'APP_TYPE_WEB',
			type: [1,2,3],
			description: 'Web for Admin Page'
		},
		{
			id: 3,
			categoryId: 1,
			value: 'MOBILE',
			key: 'APP_TYPE_MOBILE',
			type: [1,2,3],
			description: 'Mobile application'
		},
		{
			id: 4,
			categoryId: 2,
			value: 'NAVIGATE',
			key: 'BANK_ACTIONS_NAVIGATE',
			type: [1,3],
			description: 'BANK_ACTIONS: NAVIGATE'
		},
		{
			id: 5,
			categoryId: 2,
			value: 'CALL',
			key: 'BANK_ACTIONS_CALL',
			type: [1,3],
			description: 'BANK_ACTIONS: CALL'
		},
		{
			id: 6,
			categoryId: 2,
			value: 'REVIEW',
			key: 'BANK_ACTIONS_REVIEW',
			type: [1,3],
			description: 'BANK_ACTIONS: REVIEW'
		},
		{
			id: 7,
			categoryId: 2,
			value: 'FAVOURITE',
			key: 'BANK_ACTIONS_FAVOURITE',
			type: [1,3],
			description: 'BANK_ACTIONS: FAVOURITE'
		},
		{
			id: 8,
			categoryId: 2,
			value: 'ADD',
			key: 'BANK_ACTIONS_ADD',
			type: [1,2],
			description: 'BANK_ACTIONS: ADD'
		},
		{
			id: 9,
			categoryId: 2,
			value: 'UPDATE',
			key: 'BANK_ACTIONS_UPDATE',
			type: [1,2],
			description: 'BANK_ACTIONS: UPDATE'
		},
		{
			id: 10,
			categoryId: 2,
			value: 'DELETE',
			key: 'BANK_ACTIONS_DELETE',
			type: [1,2],
			description: 'BANK_ACTIONS: DELETE'
		},
		{
			id: 11,
			categoryId: 2,
			value: 'DETAIL',
			key: 'BANK_ACTIONS_DETAIL',
			type: [1,2],
			description: 'BANK_ACTIONS: DETAIL'
		},
		{
			id: 12,
			categoryId: 3,
			value: 'REPORT',
			key: 'RATING_ACTIONS_REPORT',
			type: [1,2],
			description: 'RATING_ACTIONS: REPORT'
		},
		{
			id: 13,
			categoryId: 3,
			value: 'ADD',
			key: 'RATING_ACTIONS_ADD',
			type: [1,3],
			description: 'RATING_ACTIONS: ADD'
		},
		{
			id: 14,
			categoryId: 3,
			value: 'DELETE',
			key: 'RATING_ACTIONS_DELETE',
			type: [1,2],
			description: 'RATING_ACTIONS: DELETE'
		},
		{
			id: 15,
			categoryId: 3,
			value: 'DETAIL',
			key: 'RATING_ACTIONS_DETAIL',
			type: [1,2],
			description: 'RATING_ACTIONS: DETAIL'
		},
		{
			id: 16,
			categoryId: 4,
			value: 'CALL',
			key: 'CONTACT_ACTIONS_CALL',
			type: [1,3],
			description: 'CONTACT_ACTIONS: CALL'
		},
		{
			id: 17,
			categoryId: 4,
			value: 'FAVOURITE',
			key: 'CONTACT_ACTIONS_FAVOURITE',
			type: [1,3],
			description: 'CONTACT_ACTIONS: FAVOURITE'
		},
		{
			id: 18,
			categoryId: 4,
			value: 'MAIL',
			key: 'CONTACT_ACTIONS_MAIL',
			type: [1,3],
			description: 'CONTACT_ACTIONS: MAIL'
		},
		{
			id: 19,
			categoryId: 4,
			value: 'ADD',
			key: 'CONTACT_ACTIONS_ADD',
			type: [1,2],
			description: 'CONTACT_ACTIONS: ADD'
		},
		{
			id: 20,
			categoryId: 4,
			value: 'UPDATE',
			key: 'CONTACT_ACTIONS_UPDATE',
			type: [1,2],
			description: 'CONTACT_ACTIONS: UPDATE'
		},
		{
			id: 21,
			categoryId: 4,
			value: 'DELETE',
			key: 'CONTACT_ACTIONS_DELETE',
			type: [1,2],
			description: 'CONTACT_ACTIONS: DELETE'
		},
		{
			id: 22,
			categoryId: 4,
			value: 'DETAIL',
			key: 'CONTACT_ACTIONS_DETAIL',
			type: [1,2],
			description: 'CONTACT_ACTIONS: DETAIL'
		},
		{
			id: 23,
			categoryId: 5,
			value: 'ANDROID',
			key: 'PLATFORM_TYPE_ANDROID',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: ANDROID'
		},
		{
			id: 24,
			categoryId: 5,
			value: 'IOS',
			key: 'PLATFORM_TYPE_IOS',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: IOS'
		},
		{
			id: 25,
			categoryId: 5,
			value: 'WEB',
			key: 'PLATFORM_TYPE_WEB',
			type: [1,2,3],
			description: 'PLATFORM_TYPE: WEB'
		}
	]
}