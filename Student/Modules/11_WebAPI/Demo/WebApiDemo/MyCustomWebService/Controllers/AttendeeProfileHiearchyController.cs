using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

using MyCustomWebService.Models;

namespace MyCustomWebService.Controllers {

  public class NodeState {
    public bool opened { get; set; }
    public bool disabled { get; set; }
    public bool selected { get; set; }
  }

  public class AttendeeProfileNode {
    public string id { get; set; }
    public string parent { get; set; }
    public string text { get; set; }
    public string description { get; set; }
    public string icon { get; set; }
    public NodeState state { get; set; }
    public List<AttendeeProfileNode> children { get; set; }
    public object li_attr { get; set; }
    public object a_attr { get; set; }
    public AttendeeProfileNode() {
      icon = "glyphicon glyphicon-user";
      state = new NodeState { opened = false, disabled = false, selected = false };
    }
  }

  [EnableCors("*", "*", "*", SupportsCredentials = false)]   
  public class AttendeeProfileHiearchyController : ApiController {

    public IEnumerable<AttendeeProfileNode> Get() {

      List<AttendeeProfileNode> profileNodes = new List<AttendeeProfileNode>();
      foreach (var profile in AttendeeProfiles.GetProfiles()) {
        bool expandNode = false;
        if (profile.id.Equals("1")) {
          expandNode = true;
        }
        profileNodes.Add(new AttendeeProfileNode {
          id = profile.id,
          parent = profile.parent,
          text = profile.title,
          description = profile.description,
          state = new NodeState {
            opened = expandNode,
            disabled = false,
            selected = false
          }
        });
      }
      return profileNodes;
    }
  
  }
}
