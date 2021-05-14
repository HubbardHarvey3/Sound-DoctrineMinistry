import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.component.html',
  styleUrls: ['./reference.component.css']
})
export class ReferenceComponent implements OnInit {

  bibles: Array<string> = ["King James Version", "New King James Version", "New American Standard Version"]
  studyBibles: Array<string> = ["Scofield Study System (Original edition, 'Old Scofield', KJV only)", "Ryrie Study Bible, NAS", "Wiersbe Study Bible, NKJV"]
  studyHelp: Array<string> = ["Cruden's Concordance", "Strong's Exhaustive Concordance"]
  miscellaneous: Array<{ title: string, author: string }> = [
    { title: "Sin, The Savior, and Salvation: The Theology of Everlasting Life", author: "Robert P. Lightner" },
    { title: "Rightly Dividing the Word of Truth", author: "C. I. Scofield" },
    { title: "Dispensationalism", author: "Lewis Sperry Chafer" },
    { title: "Dispensationalism", author: "Charles C. Ryrie" },
    { title: "Basic Theology", author: "Charles C. Ryrie" },
    { title: "The Moody Handbook of Theology", author: "Paul Enns" },
    { title: "Revelation", author: "Charles C. Ryrie" },
    { title: "So Great Salvation", author: "Charles C. Ryrie" },
    { title: "Biblical Demonology", author: "Merrill F. Unger" },
    { title: "The Abundant Life", author: "Ray Baughman" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
