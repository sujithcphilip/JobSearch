import { Component, OnInit, HostListener } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  jobs: any[] = [];
  jobSearchResult: any[] = [];
  allLocations = new Set();
  allCompanies = new Set();
  allSkills = new Set();
  selectedJob: any = null;
  showLocationSelector = false;
  showCompanySelector = false;
  showSkillSelector = false;

  alertTimeout = null;
  showAlert = false;
  searchChips: any = {
    location: [],
    company: [],
    skill: []
  };
  searchInputs: any = {
    location: "",
    company: "",
    skill: ""
  };

  paginationConfig: any = {
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 0,
    id: "jobsPagination"
  }
  jobIdHash = {};
  @HostListener("window:click", ['$event.target']) listen = (target) => {
    if (!document.getElementById("searchLocation").contains(target)) {
      this.showLocationSelector = false;
    }
    if (!document.getElementById("searchCompany").contains(target)) {
      this.showCompanySelector = false;
    }
    if (!document.getElementById("searchSkill").contains(target)) {
      this.showSkillSelector = false;
    }
  };
  constructor(private apiService: ApisService) { }


  ngOnInit() {
    if (this.apiService.jobs.length > 0) {
      this.jobs = this.apiService.jobs;
      this.initJobs();
    } else {
      let jobsApi = this.apiService.getJobsData().subscribe((res: any) => {
        this.apiService.jobs = res.data;
        this.jobs = this.apiService.jobs;
        this.initJobs();

      }, err => {
        console.log(err);
      });
    }

  }

  initJobs() {
    this.jobSearchResult = this.jobs;
    this.selectedJob = this.jobs[0];
    this.paginationConfig.totalItems = this.jobSearchResult.length;
    this.createMetaData();
  }

  createMetaData() {
    this.jobs.forEach(job => {
      //this.jobIdHash[job._id] = job;
      this.allCompanies.add(job.companyname.toLowerCase().trim());
      let skills = job.skills.split(",") || [];
      for (let i = 0; i < skills.length; i++) {
        let skill = skills[i];
        skill = skill.toLowerCase().trim();
        skill && this.allSkills.add(skill);
      }
      let locations = job.location.split(",") || [];
      for (let i = 0; i < locations.length; i++) {
        let location = locations[i];

        location = location.toLowerCase().trim();
        location && this.allLocations.add(location);
      }

    })
  }

  setToArray(set: Set<string>): Array<string> {
    return new Array(...set).sort();
  }
  /**
   * Generate background color for job listings
   * @param id job id
   * @param index Index in view list
   */
  getColor(id, index) {

    id = parseInt(id.replace(/[^0-9]/g, ""));
    let num = id + ((((11 + index) * (11 + index) * (11 + index)) % 97) ** 4);
    let r = 100 + num % 151;
    let g = parseInt("" + (100 + (num / 97) % 151));
    let b = parseInt("" + (100 + (num / 97 ** 2) % 151));
    return `rgba(${r}, ${g}, ${b}, 0.8)`;

  }

  getLogo(name: string) {
    let shortName = name.split(" ").map(word => {
      return (word[0] || "").trim() || ""
    }) || [];
    return shortName.join("").slice(0, 4);
  }

  isEnding(endDate): any {
    if (!endDate.trim()) {
      return { "ending": false, "old": false };
    }
    try {
      let endTime = (new Date(endDate).getTime() - new Date().getTime());
      if (endTime < (7 * 24 * 60 * 60 * 1000)) {
        if (endTime < 0) {
          return { "ending": false, "old": true };
        }
        return { "ending": true, "old": false };
      }
      return { "ending": false, "old": false };
    } catch (e) {
      console.log(e);
    }
  }

  searchUpdate(chips, type) {
    this.searchChips[type] = chips;
  }
  showMaxItemAlert() {
    clearTimeout(this.alertTimeout);
    this.alertTimeout = setTimeout(() => {
      this.showAlert = false;
    }, 3000);
    this.showAlert = true;

  }

  search() {
    let matched = [];
    let locations = [...this.searchChips.location];
    let companies = [...this.searchChips.company];
    let skills = [...this.searchChips.skill];
    for (let j = 0; j < this.jobs.length; j++) {
      let job = this.jobs[j];
      let locationMatch = !(locations.length > 0);
      let companyMatch = !(companies.length > 0);;
      let skillMatch = !(skills.length > 0);

      for (let i = 0; i < locations.length; i++) {
        let chip = locations[i];
        if (job.location.toLowerCase().indexOf(chip) > -1) {
          locationMatch = true;
          break;
        }
      }

      for (let i = 0; i < companies.length; i++) {
        let chip = companies[i];
        if (job.companyname.toLowerCase().indexOf(chip) > -1) {
          companyMatch = true;
          break;
        }
      }

      for (let i = 0; i < skills.length; i++) {
        let chip = skills[i];
        if ((job.skills.toLowerCase() + " " + job.title.toLowerCase()).indexOf(chip) > -1) {
          skillMatch = true;
          break;
        }
      }

      if (locationMatch && companyMatch && skillMatch) {
        matched.push(job);
      }
      this.jobSearchResult = matched;
      this.paginationConfig.currentPage = (this.jobSearchResult.length && 1) || 0;
      this.paginationConfig.totalItems = this.jobSearchResult.length;

    }


  }

}
