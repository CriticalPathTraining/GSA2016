using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MyCustomWebService.Models {

  public class AttendeeProfile {
    public string id { get; set; }
    public string parent { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public string[] strategies { get; set; }
    public string photoUrl { get; set; }
  }

  public class AttendeeProfiles {

    #region "Attendee Profile Data"

    private static AttendeeProfile[] profiles = { 
      new AttendeeProfile { id = "1", parent = "#", title = "Attendee", description = "A type of human who attends your training class or seminar. Attendee is the super type of all attendee design patterns and should be considered the equivalent of other familiar super types such java.lang.Object, System.Object and IUnknown." , 
                            strategies = new string[]{ 
                              "Transfer domain-specific knowlege",
                              "Provide insights you have gained from your experience in the field",
                              "Encourage Attendee to participate in classroom discussions"}
      },
      new AttendeeProfile { id = "2", parent = "1", title = "Star", description = "This is the ideal type of Attendee. This can be fairly subjective, but some guidelines for identifying a star: they participate, they are interested in the topic, they finished their labs in a timely fashion, they provide good/great scores, and most importantly is 'they get it'." ,
                            strategies = new string[]{
                              "Thank this attendee for making your job easier and more fullfilling"
                            }},
      new AttendeeProfile { id = "3", parent = "2", title = "Buddy", description = "A type of Star that is a kindred spirit, and not just about technology; you may connect with him/her on various levels throughout the event, and even socialize." ,
                            strategies = new string[]{
                              "Spend break time talking to one another",
                              "Go to lunch or dinner together",
                              "Trade email addresses"
                            } },
      new AttendeeProfile { id = "4", parent = "2", title = "Road-Warrior", description = "A type of Star that is able to absorb all the material you are presenting in class while at the same time still able to complete the demanding workload that his/her job requires. The Road-Warrior is often found in the last row of the classroom with a telnet or remote desktop connection back to his/her corporate network. The average Road-Warrior is able to bill enough hours to clients during classtime to cover the tuition for your class and his/her travel expsenses. An advanced Road-Warrior is able to make a large net profit for the week while offering consulting to a client based on the same set of topics your are discussing in class." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "5", parent = "2", title = "Mentor", description = "A type of Star who already knows more than you about the topic you are teaching. However,  instead of asking you questions that he/she knows that you don't know the answer to, the Mentor tries his/her best to help you grow and learn more during your week together. An advanced Mentor might even help you field tough questions from other students by whispering answers to you so that you appear to the rest of the class as if you already knew the answer." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "6", parent = "2", title = "Bailiff", description = "A type of Star that maintains control within the classroom. He/she gets up to shut the door when there is noise in the hall and plays the heavy in the classroom telling other students to be quiet when they are disturding your lecture."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "7", parent = "2", title = "Mother-Terisa", description = "A type of Star that provides charity work to those in need including you and other students."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "8", parent = "1", title = "Teflon", description = "A type of Attendee that will not pick up anything from your class. No matter how hard you try, you will not be able to get your points across to a Teflon nor will he/she leave the class being able to understand any of the concepts or techniques that you have taught."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "9", parent = "8", title = "Muffin-Eater", description = "A type of Teflon that is there just for the free food, beverages, or raffle prizes."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "10", parent = "8", title = "Flirt", description = "A type of Teflon that is constantly seeking your attention during lecture. He/she may do things to try to distract you while you are presenting."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "11", parent = "8", title = "Day-Planner", description = "A type of Teflon that needs to know exactly when class will start and end each day, including all breaks and lunch for the entire week. The Day-Panner also goes by the name of Franklin."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "12", parent = "8", title = "Sponge", description = "A type of Teflon that wants to learn everything about everything and the topic your are teaching is no more important to them than a random show on the Discovery Channel. Their questions are regularly out of scope; note-taking is a common trait. Sponge is commonly aggregated together with Xerox."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "13", parent = "8", title = "Xerox", description = "The Xerox takes the time required to perfectly copy all of your drawings and faithfully transcribes your comments with the accuracy of a courtroom stenographer. The Xerox likely will not ever understand what he/she is copying down the act of copying keeps him/her busy and is fulfilling."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "14", parent = "8", title = "Warden", description = "The Warden has not come to pick up anything from class but only to make sure that other attendees show up on time and do not leave early. Warden is often found in compositions along with Prisoner." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "15", parent = "8", title = "Prisoner", description = "The Prisoner was somehow made to attend your class against his/her will. A prisoner will not actively participate and or even pretend to have any interest in the topics for are teaching." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "16", parent = "15", title = "Pretzel", description = "The Pretzel is a angry type of Prisoner that sits in the front row with his/arms folded emitting negative energy."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "17", parent = "15", title = "Turncoat", description = "A type of Prisoner is a big fan of directly competing product or technology that you are teaching about."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "18", parent = "8", title = "Career-Changer", description = "A type of Teflon that is looking to make more money and heard that your industry can provide that. Career-Changer is often aggregated together with Sponge."  ,
                            strategies = new string[]{
                              "xx"
                            }},
      new AttendeeProfile { id = "19", parent = "8", title = "Surfer", description = "The surfer never makes eye contact, because he or she is busy surfing the internet. If you are sharp, you can determine if the Surfer is actually a Road Warrior." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "20", parent = "1", title = "Red-Flag", description = "A type of attendee that brings potential problems into the class that warrant your attention and will likely disrupt class unless you take action." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "21", parent = "20", title = "Fidget", description = "A type of Red-Flag that can`t stay still. The Fidget is constantly shifting, shuffling, and possible loud sighing. You know the chairs are going to get horrible scores." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "22", parent = "20", title = "Mubler", description = "Mumblers are more than just quiet or hard-to-understand students, but they insist on sitting as far from you as possible, possibly next to a noisy piece of equipment and then ask many questions." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "23", parent = "20", title = "Story-Teller", description = "A type of Red-flag that has a way of sucking you in. The Story-teller might or might not have a good question or comment, but unfortunately he/she must always preface it with a long diatribe or story." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "24", parent = "20", title = "Spell-Checker", description = "A type of Red-Flag that makes a point to identify all typos and errors of any size or relevance; also known as F7." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "25", parent = "20", title = "Blue-Screen", description = "The Blue Screen is the unlucky student who`s computer just locks up or otherwise misbehaves. Everyone in the class pressed F5 on the exact same VPC image and the Blue Screen's computer is the only one that goes up in flames. Usually walking over and standing near the computer fixes the problem." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "26", parent = "20", title = "Stalker", description = "A type of Red-Flag who wants your contant attention after lecture stops until lecture resumes; he/she will not let you take breaks, eat lunch, or go to the restroom without following and asking questions or telling stories." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "27", parent = "20", title = "Telepath", description = "Telepaths have insight into what the future will bring in the way of new technology, or at least they like to think so. Telepaths may be dinosaurs in disguise." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "28", parent = "20", title = "Rain-Man", description = "These students answer questions you asked an hour ago." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "29", parent = "20", title = "Know-It-All", description = "We`ve all met them; they are already experts in whatever you are explaining, regardless of the subject matter; whether they actually know the material is irrelevant." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "30", parent = "29", title = "Dinosaur", description = "A type of Know-It-All but with no modern experience; however, their 20+ years of experience on a dead technology qualifies them as an expert (in their mind). Dinosaur is particularly toxic when aggregated together with Story-Teller." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "31", parent = "29", title = "Thunder-Stealer", description = "A type of 'Know-It-All' or 'Doppleganger' who steals your punchlines or answers as you are explaining a concept." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "32", parent = "29", title = "Head-Start", description = "A type of Know-It-All that constantly keeps you informed of how he/she is already working on the next module or lab excersie even though you have not yet presented on that topic. He/she needs to feel that they have an edge over all other types of Attendee in the class and might leave class early to convey the fact that they 'got it' before anyone else. It is not overly uncommon for Head-Start to be aggregated together with Day-Planners." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "33", parent = "20", title = "Salesman", description = "The salesman relates all features and capabilities back to their favorite technology; they may be open minded and even persuaded, but not before you hear the pitch a few dozen times; may also qualify as a 'Dinosaur'." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "34", parent = "33", title = "Insurgent", description = "An Insurgent is a type of salesman, but is completely closed minded, almost on a Jihad to convert other students and the instructor to their way of thinking." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "35", parent = "20", title = "Client", description = "A type of Red-Flag that has somehow confused your training class with his own personal consulting engagement. He/she asks you all kinds of questions about his/her current engagement and attempts to give you 100+ pages of documentation at the end of the first day for you to read overnight so you can get up to speed and be useful." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "36", parent = "35", title = "Angry-Client", description = "A type of Client that begins to get annoyed that you answer questions asked by other types of Attendee and you continue to teach the material advertised for the class even though he/she has made it clear that's not what he/she paid for." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "37", parent = "36", title = "Really-Angry-Client", description = "A type of Angry-Client that boils over and storms out of the classroom vowing never to hire you as a consultant again." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "38", parent = "1", title = "Sleeper", description = "A type of attendee that represents a danger in waiting. Unlike Red-Flag, sleepers are much harder to detect as well as the problems they can cause." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "39", parent = "38", title = "Doppleganger", description = "A type of Sleeper that is not really interested in the material you are teaching. Instead, he/she wants to be an instructor or presenter himself/herself and all of their questions pertain to metadata about the event, you, and your career." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "40", parent = "38", title = "Assassin", description = "A type of Sleeper that interacts with you throughout class; never complains, actively particpates, and then gives scathing post-class evaluation scores without any text-based comments to provide you with any insight into his/her dissatisfaction. Assassin is particular dangerous and diabolical if he/she can successfully impersonate Buddy." ,
                            strategies = new string[]{
                              "xx"
                            } },
      new AttendeeProfile { id = "41", parent = "38", title = "Evil-Genius", description = "A type of Sleeper that uses his/her heightened intelligence of the subject for malicious purposes. Keep a watchful eye, because they like to hide among the other students." ,
                            strategies = new string[]{
                              "xx"
                            } }
    };
    #endregion

    public static AttendeeProfile[] GetProfiles() {
      return profiles;
    }

    public static AttendeeProfile GetProfileHierchy() {
      var root = profiles.Where(profile => profile.id.Equals(1)).FirstOrDefault();
      return root;
    }


  }



}