define([
	'util',
	'moment',
	'collections/projects',
	'collections/sections',
	'collections/sources',
	'collections/notes',
], function (util, moment, ProjectsCollection, SectionsCollection, SourcesCollection, NotesCollection) { //MenuCollection example
	var dataLoader = (function() {

		// this.ensureListLoaded = function(callback, object, propertyName, ctor, id) {
		// 	var current = object[propertyName];
		// 	if (current == null) {
		// 		var current = object[propertyName] = new ctor();
		// 		current.loading = true;
		// 		current.id = id;
		// 		current.fetch({
		// 			success: function() {
		// 				current.loading = false;
		// 				if (callback) callback();
		// 				/*surprisingly enough the loading == true and extraCallback stuff is for race conditions*/
		// 				/*while an object is loading, another call can request the same object, so these extra requests just get tacked on*/
		// 				if (current.extraCallbacks && current.extraCallbacks.length > 0) {
		// 					for (var i = 0; i < current.extraCallbacks.length; i++) {
		// 						current.extraCallbacks[i]();
		// 					}
		// 				}
		// 			},
		// 			error: function(originalModel, resp, options) {
		// 				originalModel.trigger('error', originalModel, resp, options);
		// 				//if (callback) callback();
		// 			}
		// 		});
		// 	} else {
		// 		if (current.loading) {
		// 			if (!current.extraCallbacks) {
		// 				current.extraCallbacks = [];
		// 			}
		// 			current.extraCallbacks.push(callback);
		// 		} else if (callback) {
		// 			callback();
		// 		}
		// 	}
		// };

		return {
			gridster: null,
			currentProject: null,
			projects: null,
			sections: null,
			sources: null,
			notes: null,
			dumpAll: function (options) {
				this.gridster = null;
				this.currentProject = null;
				this.projects = null;
				this.sections = null;
				this.sources = null;
				this.notes = null;
			},
			// ensureHatListLoaded: function (callback) { //example
			// 	ensureListLoaded(callback, this, 'hats', ProductCollection);
			// },
			// loadMany: function (dataList, callback) {
			// 	//scatter gather, make many requests and call the callback when they all have completed, or timeout.
			// 	if (dataList == null) return;

			// 	//convert a single string to an array
			// 	if (typeof dataList == "string") {
			// 		dataList = new Array(dataList);
			// 	}

			// 	var loaders = [];
			// 	for (var i = 0; i < dataList.length; i++) {
			// 		var loader = this.getLoader(dataList[i])
			// 		loaders.push(this[loader]);
			// 	}
			// 	this.scatterGather(loaders, callback);
			// },
			// scatterGather: function (requests, callback) {
			// 	var closureCount = 0;
			// 	var closureExpecting = requests.length;
			// 	var twentySeconds = 20000; //fail safe, timeout
			// 	var closureTimeoutHandle = null;
			// 	var closureCallback = callback;
			// 	var allComplete = function() {
			// 		if (closureCount === 0) {
			// 			closureTimeoutHandle = setTimeout(function() {
			// 				if (closureCallback != null) {
			// 					closureCallback();
			// 				}
			// 			}, twentySeconds);
			// 		}
			// 		closureCount++;
			// 		if (closureCount === closureExpecting) {
			// 			clearTimeout(closureTimeoutHandle);
			// 			if (closureCallback != null) closureCallback();
			// 		}
			// 	};
			// 	for (var i = 0; i < requests.length; i++) {
			// 		requests[i].call(this, allComplete);
			// 	}
			// },
			// ensureLoaded: function (propertyName, callback) {
			// 	var loader = this.getLoader(propertyName);
			// 	this[loader](callback);
			// },
			// getLoader: function (propertyName) {
			// 	var name = propertyName;
			// 	if (name === 'menus') {
			// 		return 'ensureMenuListLoaded';
			// 	} else {
			// 		throw 'Unknown data name ' + propertyName;
			// 	}
			// },
			ensureDemoDataLoaded: function (callback) {
				if( this.currentProject === null ||
					this.projects === null ||
					this.sections === null ||
					this.sources === null ||
					this.notes === null ) {

					var self = this;

					//SECTIONS
					var sourcesCollection = new SourcesCollection();
					var notesCollection = new NotesCollection();
					var sections = [ 
						{id: 1, orderId:1, title: '', text: '', templatePlaceholderText: 'Start writing here', sectionPlaceholderText: 'Open section to start writing', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:4, title: '', text: '', templatePlaceholderText: 'Start writing here', sectionPlaceholderText: 'Open section to start writing', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: '', text: '', templatePlaceholderText: 'Start writing here', sectionPlaceholderText: 'Open section to start writing', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:2, title: '', text: '', templatePlaceholderText: 'Start writing here', sectionPlaceholderText: 'Open section to start writing', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
					 ];

                    /*Pavan did modifications above. Removed title text and added null strings*/

					this.sections = new SectionsCollection();
					this.sections.comparator = 'orderId';
					_.each(sections, function (section) { 
						self.sections.create(section); //create each project model and add to collection
					});
					//END SECTIONS

					//TODO
					//manage sections and sources many to many relationship
					// this.sections.on('change:sources', function () {
					// 	//Update source sections collection

					// });
					//END SHOPPING CART PRODUCTS

					//SOURCES
					var sects = new SectionsCollection(); 
					var sources = [

                        {id: 1, title: 'Source 1', description: 'intro source blah', sections: sects.clone(), type: 'document'},
                        {id: 2, title: 'Source 4', description: 'End source blah', sections: sects.clone(), type: 'audio'},
                        {id: 3, title: 'Source 3', description: 'middle 3 source blah', sections: sects.clone(), type: 'video'},
                        {id: 4, title: 'Source 2', description: 'middle 2 source blah', sections: sects.clone(), type: 'photo'},
						 ];

					this.sources = new SourcesCollection();
					this.sources.comparator = 'title';
					_.each(sources, function (source) { 
						self.sources.create(source); //create each project model and add to collection
					});
					//END SOURCES

					//NOTES
					var notes = [
                        {id: 1, title: 'Note 1', text: 'note 1', sections: sects.clone() },
                        {id: 2, title: 'Note 2', text: 'note 2', sections: sects.clone() },
                        {id: 3, title: 'ANote 3', text: 'note 3', sections: sects.clone() },
                        {id: 4, title: 'Another Note 4', text: 'note 4', sections: sects.clone() },
					 ];

					this.notes = new NotesCollection();
					this.notes.comparator = 'title';
					_.each(notes, function (note) { 
						self.notes.create(note); //create each project model and add to collection
					});
					//END NOTES


					//PROJECTS
					var projects = [ 
						{ id: 1, title: 'Project Title', sections: this.sections, sources: this.sources, notes: this.notes} 
					];

					this.projects = new ProjectsCollection();
					_.each(projects, function (project) { 
						self.projects.create(project); //create each project model and add to collection
					});
					this.currentProject = this.projects.at(0);
					//END PROJECTS


					//TEMPLATES
					var customTemplateSections = [ 
						{id: 1, orderId:1, title: 'Section name here', text: '',sectionPlaceholderText: 'Open section to start writing', templatePlaceholderText: 'Start writing here', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Section name here', text: '',sectionPlaceholderText: 'Open section to start writing', templatePlaceholderText: 'Start writing here', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Section name here', text: '',sectionPlaceholderText: 'Open section to start writing', templatePlaceholderText: 'Start writing here', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
					 	{id: 4, orderId:4, title: 'Section name here', text: '',sectionPlaceholderText: 'Open section to start writing', templatePlaceholderText: 'Start writing here', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var customTemplateSectionsCollection = new SectionsCollection();
					_.each(customTemplateSections, function (section) {
						customTemplateSectionsCollection.create(section);
					});
					customTemplateSectionsCollection.comparator = 'orderId';



					var expositoryTemplateSections = [ 
						{id: 1, orderId:1, title: 'Introduction', text: '', templatePlaceholderText: 'State the thesis and introduce the divisions of the essay', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Idea 1', text: '', templatePlaceholderText: 'Develop the primary support/evidence for this idea', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Idea 2', text: '', templatePlaceholderText: 'Develop the primary support/evidence for this idea', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Idea 3', text: '', templatePlaceholderText: 'Develop the primary support/evidence for this idea', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'Conclusion', text: '', templatePlaceholderText: 'Restate the thesis and divisions of the essay. Bring the essay to an appropriate and effective close', sources: sourcesCollection.clone(), notes: notesCollection.clone() }
					 ];
					var expositoryTemplateSectionsCollection = new SectionsCollection();
					_.each(expositoryTemplateSections, function (section) {
						expositoryTemplateSectionsCollection.create(section);
					});
					expositoryTemplateSectionsCollection.comparator = 'orderId';

					var argumentativeTemplateSections = [ 
						{id: 1, orderId:1, title: 'Introduction', text: '', templatePlaceholderText: 'Set up and state your claim', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Background', text: '', templatePlaceholderText: 'Lay the foundation for proving your argument', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Evidence #1', text: '', templatePlaceholderText: 'Use supporting evidence to prove your argument', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Evidence #2', text: '', templatePlaceholderText: 'Use supporting evidence to prove your argument', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'Evidence #3', text: '', templatePlaceholderText: 'Use supporting evidence to prove your argument', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 6, orderId:6, title: 'Counterargument', text: '', templatePlaceholderText: 'Anticipate you reader’s objections', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 7, orderId:7, title: 'Conclusion (Part 1)', text: '', templatePlaceholderText: 'Remind readers of your argument and supporting evidence', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 8, orderId:8, title: 'Conclusion (Part 2)', text: '', templatePlaceholderText: 'This is the “so what” part that illustrates the significance of your claim? What should be taken away from this?', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
					 ];
					var argumentativeTemplateSectionsCollection = new SectionsCollection();
					_.each(argumentativeTemplateSections, function (section) {
						argumentativeTemplateSectionsCollection.create(section);
					});
					argumentativeTemplateSectionsCollection.comparator = 'orderId';

					var narrativeChronologicalTemplateSections = [ 
						{id: 1, orderId:1, title: 'Introduction', text: '', templatePlaceholderText: 'Introduce the story', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Background', text: '', templatePlaceholderText: 'Describe the setting people', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Situation/Complication', text: '', templatePlaceholderText: 'Tell what happened', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Resolution', text: '', templatePlaceholderText: 'Tell how the story or situation was resolved', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'Significance', text: '', templatePlaceholderText: 'State something about the significance of the story', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var narrativeChronologicalTemplateSectionsCollection = new SectionsCollection();
					_.each(narrativeChronologicalTemplateSections, function (section) {
						narrativeChronologicalTemplateSectionsCollection.create(section);
					});
					narrativeChronologicalTemplateSectionsCollection.comparator = 'orderId';

					var responseTemplateSections = [ 
						{id: 1, orderId:1, title: 'Introduction', text: '', templatePlaceholderText: 'Give background information about the literary piece and create a thesis statement to focus the essay', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Evidence 1 ', text: '', templatePlaceholderText: 'Provide evidence/support for the thesis', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Evidence 2 ', text: '', templatePlaceholderText: 'Provide evidence/support for the thesis', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Evidence 3 ', text: '', templatePlaceholderText: 'Provide evidence/support for the thesis', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'Conclusion ', text: '', templatePlaceholderText: 'Restate the thesis and comment why points made in paragraphs are significant. State the significance of these points to your life', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var responseTemplateSectionsCollection = new SectionsCollection();
					_.each(responseTemplateSections, function (section) {
						responseTemplateSectionsCollection.create(section);
					});
					responseTemplateSectionsCollection.comparator = 'orderId';

					var researchTemplateSections = [ 
						{id: 1, orderId:1, title: 'Abstract', text: '', templatePlaceholderText: 'A paragraph to summarize the article or paper. State why the research is important, the methodology used, the results, and a concluding statement based on the findings.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Introduction or Literature Review', text: '', templatePlaceholderText: 'Provide background, state the purpose of the research, discuss previous research leading up to the study.   Address questions that remain unanswered or require additional research. Introduce the research question and state the hypotheses or anticipated results ', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Method or Methodology', text: '', templatePlaceholderText: 'Describe how the research was conducted, with details about the study sample, assessment measures and procedure.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Results or Findings', text: '', templatePlaceholderText: 'Present the research findings in this section. Describe any statistical analyses performed. Display results using tables, charts, or figures along with a written explanation.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'Discussion', text: '', templatePlaceholderText: 'Interpret the results and provide possible explanations for what was found, including an interpretation of unexpected results', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 6, orderId:6, title: 'Conclusion', text: '', templatePlaceholderText: 'Summarize what was found and link it back to how the results answered the research question. Describe any limitations of the study. Suggest directions for future research in this section.', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var researchTemplateSectionsCollection = new SectionsCollection();
					_.each(researchTemplateSections, function (section) {
						researchTemplateSectionsCollection.create(section);
					});
					researchTemplateSectionsCollection.comparator = 'orderId';

					var journalismTemplateSections = [ 
						{id: 1, orderId:1, title: 'Lede', text: '', templatePlaceholderText: 'Who, What, When, Where, Why, (&ldquo;the 5 W&#39;s&rdquo;) and How', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'Nut Graf', text: '', templatePlaceholderText: 'Why this matters/who cares: Sum up main point of story', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'Body', text: '', templatePlaceholderText: 'Background, supporting details, evidence, quotes, narrative, argument', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'Tail', text: '', templatePlaceholderText: 'Extra bits of information, facts, points you want to leave the reader with', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var journalismTemplateSectionsCollection = new SectionsCollection();
					_.each(journalismTemplateSections, function (section) {
						journalismTemplateSectionsCollection.create(section);
					});
					journalismTemplateSectionsCollection.comparator = 'orderId';

					var whitepaperTemplateSections = [ 
						{id: 1, orderId:1, title: 'Executive Summary', text: '', templatePlaceholderText: 'Summarize the paper in a few short paragraphs. (Typically written last).', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 2, orderId:2, title: 'The Opportunity or Problem', text: '', templatePlaceholderText: 'This is the “burning platform” or the problem at hand. State why this situation exists and why it needs resolution.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 3, orderId:3, title: 'The History', text: '', templatePlaceholderText: 'State the series of events that led to the current situation.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 4, orderId:4, title: 'The Solution', text: '', templatePlaceholderText: 'Create the vision that will remedy the Opportunity or Problem.  Do this by stating your point of view on best practices and key considerations. Do not get specific about products or services sold by your organization. This is usually the longest section in the whitepaper. ', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 5, orderId:5, title: 'The Benefits', text: '', templatePlaceholderText: 'State the benefit and/or business case to the reader. Create “the hook” so that the reader is compelled to pursue next steps to the solution described in the paper.', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 6, orderId:6, title: 'Call-to-Action', text: '', templatePlaceholderText: 'State briefly what you want the reader to do next and take away from the paper', sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{id: 7, orderId:7, title: 'About your Organization', text: '', templatePlaceholderText: 'Make the connection between the solutions stated in the paper and your company or organization.', sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					 ];
					var whitepaperTemplateSectionsCollection = new SectionsCollection();
					_.each(whitepaperTemplateSections, function (section) {
						whitepaperTemplateSectionsCollection.create(section);
					});
					whitepaperTemplateSectionsCollection.comparator = 'orderId';


					var templates = [
						{ id: 1, title: 'Blank Document', sections: customTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 2, title: 'Essay: Expository', sections: expositoryTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 3, title: 'Essay: Argumentative', sections: argumentativeTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 4, title: 'Essay: Narrative Chronological', sections: narrativeChronologicalTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 5, title: 'Essay: Response to Literature', sections: responseTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 6, title: 'Research Paper or Article', sections: researchTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 7, title: 'Journalism: Straight News', sections: journalismTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()},
						{ id: 8, title: 'Whitepaper', sections: whitepaperTemplateSectionsCollection, sources: sourcesCollection.clone(), notes: notesCollection.clone()}
					];/*Modification did for template id 1 by Pavan. Changed title from Custom to Blank Docuement*/
					this.templates = new ProjectsCollection();
					_.each(templates, function (templateProject) {
						self.templates.create(templateProject);
					});
					//END TEMPLATES

				}
				if (callback) callback();
			},
			handleCollectionAdd: function (collectionType, sourceOrNoteId, sectionModel) {
				if (collectionType !== 'notes' && collectionType !== 'sources') {
					console.log('ERROR: Bad collectionType: '+ collectionType);
				} else {
					var noteOrSource = this.currentProject.get(collectionType).get(parseInt(sourceOrNoteId));
					var oldSectionId = noteOrSource.get('sectionIdAssigned');
					if (oldSectionId == sectionModel.id) {
						return;
					}
					if (oldSectionId !== null) {
						this.currentProject.get('sections').get(oldSectionId).get(collectionType).remove(noteOrSource);
					}

					console.log('dropped noteId: '+ sourceOrNoteId);
					sectionModel.get(collectionType).add([noteOrSource]);
					noteOrSource.get('sections').add([sectionModel]);	
					noteOrSource.set({unassigned: false, sectionIdAssigned: sectionModel.id});
				} 
			},
			handleCollectionRemoveFromSection: function (collectionType, sectionId, sourceOrNoteModel) {
                console.log(collectionType)
                console.log(sectionId)
                console.log(sourceOrNoteModel)
				if (collectionType !== 'notes' && collectionType !== 'sources') {
					console.log('ERROR: Bad collectionType: '+ collectionType);
				} else {
					var section = this.currentProject.get('sections').get(parseInt(sectionId));
					var id = sourceOrNoteModel.id;
					section.get(collectionType).remove(sourceOrNoteModel);
					sourceOrNoteModel.set({unassigned: true, sectionIdAssigned: null});
					sourceOrNoteModel.get('sections').remove(section);
				}
			}
		};
	}());
	return dataLoader;
});