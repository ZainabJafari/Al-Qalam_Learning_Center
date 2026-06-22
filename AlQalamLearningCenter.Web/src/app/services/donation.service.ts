import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateCheckoutSessionResponse,
  CreateDonationRequest,
  DonationResponse
} from '../types/donation.models';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  // Local API base for development. We can move this to environment config later.
  private readonly apiBaseUrl = 'http://localhost:5256/api';

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

