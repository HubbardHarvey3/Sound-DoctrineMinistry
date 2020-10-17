import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it("Ensure Variables are pointing at Production", () => {
    expect(service.configURL).toEqual("https://sound-doctrineministry.org/audio/json")
    expect(service.uploadURL).toEqual("https://sound-doctrineministry.org/api/upload")
    expect(service.uploadAudioFileURL).toEqual("https://sound-doctrineministry.org/api/uploadAudio")
    expect(service.overwriteURL).toEqual("https://sound-doctrineministry.org/api/deleteBroadcasts")
    expect(service.fileToDeleteURL).toEqual("https://sound-doctrineministry.org/api/deleteFile")
  })
});

