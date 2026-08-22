import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateCheckoutSessionResponse,
  CreateDonationRequest,
  DonationResponse
} from '../types/donation.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private readonly apiBaseUrl = environment.apiBaseUrl;

  constructor(private readonly http: HttpClient) {}

  createDonation(request: CreateDonationRequest): Observable<DonationResponse> {
    return this.http.post<DonationResponse>(`${this.apiBaseUrl}/donations`, request);
  }

  getDonation(id: string): Observable<DonationResponse> {
    return this.http.get<DonationResponse>(`${this.apiBaseUrl}/donations/${id}`);
  }

  createCheckout(id: string): Observable<CreateCheckoutSessionResponse> {
    return this.http.post<CreateCheckoutSessionResponse>(
      `${this.apiBaseUrl}/donations/${id}/checkout`,
      {}
    );
  }
}

